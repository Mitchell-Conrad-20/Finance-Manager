from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import api as api
from models import db, User
import redis
from flask_session import Session

# App Setup
app = Flask(__name__)
bcrypt = Bcrypt(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'secretKeyGoesHere'

app.config['SESSION_TYPE'] = "redis"
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379/")

# Initialize
db.init_app(app)
with app.app_context():
    db.create_all()

# Set session after config
server_session = Session(app)

# Prevent CORS errors
CORS(app)

# ROUTES
# TODO: Add Routes to Routes File

# Get current user
@app.route("/getCurrentUser", methods=['GET'])
def getCurrentUser():
    userId = session.get("user_id")
    
    if not userId:
        return jsonify({"Error": "No current user"})

    user = User.query.filter_by(id = userId).first()

    if not user:
        return jsonify({"Error": "No user exists with the user id provided by session"})

    return jsonify({
        "id": user.id,
        "email": user.email
    })

# Register POST 
@app.route("/register", methods=['POST'])
def register():
    email = request.json["email"]
    password = request.json["password"]

    userExists = User.query.filter_by(email=email).first() is not None

    if userExists:
        return jsonify({"Error": "User Already Exists"}), 409

    hash = bcrypt.generate_password_hash(password)
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

    # Set the server side session
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

# GET Request Routes
@app.route("/bankData")
def bankData():
    return jsonify(api.getCsv())

# Run App
if (__name__ == "__main__"):
    app.run(debug=True)