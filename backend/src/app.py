from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost:27017/weatherapp'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users

# @app.route('/')
# def index():
#     return '<h1>Hello World</h1>'

@app.route('/user', methods=['POST'])
def create_user():
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