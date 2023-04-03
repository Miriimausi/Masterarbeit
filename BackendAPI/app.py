from flask_sqlalchemy import SQLAlchemy
from flask_restx import Resource, Api, fields, Namespace
from flask import Flask, request, jsonify

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/mydatabase'
db = SQLAlchemy(app)

# Define data models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

# Initialize Flask-RestX API
api = Api(app, version='1.0', title='My App API',
          description='API for my app')

# Define data model for API documentation
user_model = api.model('User', {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
    'password': fields.String,
})

# Define API routes

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username, password=password).first()
    if user is not None:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})
    


@app.route('/api/register', methods=['POST'])
def register():
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    
    if not email or not username or not password:
        return jsonify({'success': False, 'error': 'Incomplete data'})
    
    existing_user = User.query.filter_by(email=email, username=username).first()
    if existing_user:
        return jsonify({'success': False, 'error': 'User already exists'})
    
    new_user = User(email=email, username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(debug=True)


