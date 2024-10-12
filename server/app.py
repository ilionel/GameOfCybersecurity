from dataclasses import dataclass
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/mydb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database model for scores
class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# Create database tables
with app.app_context():
    db.create_all()

@app.route("/addScore", methods=['POST'])
def add_score():
    username = request.json.get('username', None)
    difficulty = request.json.get('difficulty', None)
    score = request.json.get('score', None)

    if username is None:
        return "Missing username", 400
    if difficulty is None:
        return "Missing difficulty", 400
    if score is None:
        return "Missing score", 400

    new_score = Score(username=username, difficulty=difficulty, score=score)
    db.session.add(new_score)
    db.session.commit()

    return jsonify({"username": username, "difficulty": difficulty, "score": score}), 200

def get_top_score(username, difficulty):
    top_score = db.session.query(Score).filter_by(username=username, difficulty=difficulty).order_by(Score.score.desc()).first()
    if top_score:
        return {"score": top_score.score, "date": top_score.date.strftime('%Y-%m-%d %H:%M:%S')}
    return {"score": 0, "date": str(datetime.now())}

@app.route("/getLeaderboard", methods=['GET'])
def getLeaderboard():
    difficulty = request.args.get('difficulty', "1")

    if difficulty.isnumeric():
        difficulty = int(difficulty)
    else:
        return "Difficulty should be numeric", 400

    users = db.session.query(Score.username).distinct().all()
    top_scores = [{"username": username[0], **get_top_score(username[0], difficulty)} for username in users]

    return jsonify(top_scores), 200

if __name__ == '__main__':
    app.run(debug=True)
