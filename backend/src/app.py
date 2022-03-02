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

@app.route('/user', methods=['GET', 'POST'])
def create_user():
    id = db.insert_one({
        'name': request.json['name'],
        'email': request.json['email'],
        'city': request.json['city'],
        'state': request.json['state'],
    })
    return jsonify({'id': str(id.inserted_id), 'msg': "User added successfully"})

if __name__ == '__main__':
    app.run(debug=True)