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
    answers = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# Create database tables
with app.app_context():
    db.create_all()

@app.route("/addScore", methods=['POST'])
def add_score():
    username = request.json.get('username', None)
    difficulty = request.json.get('difficulty', None)
    score = request.json.get('score', None)
    answers = request.json.get('answers', None)

    if username is None:
        return "Missing username", 400
    if difficulty is None:
        return "Missing difficulty", 400
    if score is None:
        return "Missing score", 400
    if answers is None:
        return "Missing answers", 400

    new_score = Score(username=username, difficulty=difficulty, score=score, answers=answers)
    db.session.add(new_score)
    db.session.commit()

    return jsonify({"username": username, "difficulty": difficulty, "score": score}), 200

def get_top_score(username, difficulty):
    top_score = db.session.query(Score).filter_by(username=username, difficulty=difficulty).order_by(Score.score.desc()).first()
    if top_score:
        return {"username": username, "score": top_score.score, "date": top_score.date.strftime('%Y-%m-%d %H:%M:%S')}
    return {}

@app.route("/getLeaderboard", methods=['GET'])
def getLeaderboard():
    difficulty = request.args.get('difficulty', "1")

    if difficulty.isnumeric():
        difficulty = int(difficulty)
    else:
        return "Difficulty should be numeric", 400

    users = db.session.query(Score.username).distinct().all()
    top_scores = []
    for username in users:
        score = get_top_score(username[0], difficulty)
        if score:
            top_scores.append({**score})
    return jsonify(top_scores), 200

@app.route("/getStatistics", methods=['GET'])
def getStatistics():
    difficulty = request.args.get('difficulty', "1")

    if difficulty.isnumeric():
        difficulty = int(difficulty)
    else:
        return "Difficulty should be numeric", 400

    all_answers = db.session.query(Score.answers).filter_by(difficulty=difficulty).all()
    # Initialize statistics for each question
    num_questions = len(all_answers[0][0].strip('{}').split(',')) if all_answers else 0
    statistics = [[0, 0, 0] for _ in range(num_questions)]
    for answers_tuple in all_answers:
        answers_str = answers_tuple[0]
        answers = answers_str.strip('{}').split(',')
        for pos, answer in enumerate(answers):
            if answer == '✅':
                statistics[pos][0] += 1
            elif answer == '❌':
                statistics[pos][1] += 1
            elif answer == '🕒':
                statistics[pos][2] += 1
                
    # Display statistics for verification
    #for i, stat in enumerate(statistics):
    #    print(f"Question {i + 1}: ✅ = {stat[0]}, ❌ = {stat[1]}, 🕒 = {stat[2]}")
    return jsonify(statistics), 200
            

if __name__ == '__main__':
    app.run(debug=True)
