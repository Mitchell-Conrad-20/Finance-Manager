import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import api as api
from models import db, User

# App Setup
app = Flask(__name__)
bcrypt = Bcrypt(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'secretKeyGoesHere'

# Initialize
db.init_app(app)
with app.app_context():
    db.create_all()

# Prevent CORS errors
CORS(app)

# Register POST 
@app.route("/register", methods=['POST'])
def register():
    email = request.json["email"]
    password = request.json["password"]

    userExists = User.query.filter_by(email=email).first() is not None

    if userExists:
        return jsonify({"Error": "User Already Exists"}), 409

    hash = bcyrpt.generate_password_hash(password)
    user = User(email = email, password = hash)
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "id": user.id,
        "email": user.email
    })

# Login POST
@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"Error": "User not found"})

    userIsValid = bcrypt.check_password_hash(user.password, password)

    if not userIsValid:
        return jsonify({"Error": "Invalid password"})

    #still need to return the session cookie thingy

# GET Request Routes
@app.route("/bankData")
def bankData():
    return jsonify(api.getCsv())

# Run App
if (__name__ == "__main__"):
    app.run(debug=True)