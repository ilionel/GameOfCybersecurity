from dataclasses import dataclass, asdict
from typing import Any, List
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import os

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/mydb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database model for questions
class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    answers = db.Column(db.JSON, nullable=False)
    good_answer = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    details = db.Column(db.String(255), nullable=False)

# Database model for results
class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)

# Create database tables
with app.app_context():
    db.create_all()

class Reader:
    def __init__(self, model) -> None:
        self.model = model

    def read(self) -> List[Any]:
        return self.model.query.all()

    def write(self, data) -> None:
        for item in data:
            db.session.add(item)
        db.session.commit()

class QuestionsReader(Reader):
    def __init__(self) -> None:
        super().__init__(Question)

class ResultsReader(Reader):
    def __init__(self) -> None:
        super().__init__(Result)

if __name__ == '__main__':
    app.run(debug=True)
