from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


app = Flask(__name__)

app.config['MONGO_URI']='mongodb://localhost:27017/weatherapp'
app.config['JWT_SECRET_KEY']='please-remember-to-change-me'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)


jwt = JWTManager(app)
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users

# @app.route('/')
# def index():
#     return '<h1>Hello World</h1>'

'''Authentiction Section'''
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

'''CRUD Section'''
@app.route('/user', methods=['POST'])
def create_user():
    print(request.json)
    id = db.insert_one({
        'name': request.json['name'],
        'email': request.json['email'],
        'city': request.json['city'],
        'state': request.json['state'],
    })
    return jsonify({'id': str(id.inserted_id), 'msg': "User added successfully"})

@app.route('/users', methods=['GET'])
def get_users():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(doc['_id']),
            'name': str(doc['name']),
            'email': str(doc['email']),
            'city': str(doc['city']),
            'state': str(doc['state']),
        })
    return jsonify(users)

@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = db.find_one({
        '_id': ObjectId(id)
    })
    return jsonify({
        '_id': str(user['_id']),
        'name': str(user['name']),
        'email': str(user['email']),
        'city': str(user['city']),
        'state': str(user['state']),
    })

@app.route('/users/<id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    db.delete_one({
        '_id': ObjectId(id)
    })
    return jsonify({'msg': 'User Deleted Successfully'})

@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    db.update_one({
        '_id': ObjectId(id)}, {'$set': {
            'name': request.json['name'],
            'email': request.json['email'],
            'city': request.json['city'],
            'state': request.json['state'],
        }
    })
    return jsonify({'msg': 'User updated successfully'})

if __name__ == '__main__':
    app.run(debug=True)