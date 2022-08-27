from email.policy import default
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def generateUID():
    return uuid4().hex


# User database model for all users in users tables
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key = True, unique = True, default = generateUID)
    email = db.Column(db.String(345), unique = True)
    password = db.Column(db.Text, nullable = False)