
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, Email
from flask_restx import Resource, Api, fields, Namespace
from flask import Flask, request, jsonify
from flask import redirect, url_for



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/mydatabase'
db = SQLAlchemy(app)

# Define data models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    liked = db.Column(db.Integer)
    tracked =db.Column(db.Integer)
    imageUrl =db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'liked': self.liked,
            'tracked':self.tracked,
            'imageUrl':self.imageUrl}


class Questionnaire(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String)
    answer =db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'type':self.type,
            'answer': self.answer,
            
            }
    

class UserAntecedents(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    age = db.Column(db.Integer, nullable=False)
    height= db.Column (db.Numeric(precision=2, scale=2),nullable= False)
    weight= db.Column (db.Numeric(precision=2, scale=2),nullable= False)
    bmi = db.Column(db.Numeric(precision=5, scale=2), nullable=False)
    gender =db.Column(db.String, nullable=False)
    smoking= db.Column(db.String)
    alcohol= db.Column(db.String)
    activityLevel =db.Column(db.String)
    

    def to_dict(self):
        return {
            
            'age': self.age,
            'height': self.height,
            'weight': self.weight,
            'bmi': self.bmi,
            'gender': self.gender,
            'smoking': self.smoking,
            'alcohol': self.alcohol,
            'activtyLevel': self.activityLevel,
            
        }


# Initialize Flask-RestX API
api = Api(app, version='1.0', title='My App API',
          description='API for my app')

auth_namespace= Namespace("auth", description="handles authentication")
activity_namespace =Namespace("activities", description="handles activities")
userProfile_namespace =Namespace("UserProfile", description="handles the UserProfile")
question_namespace = Namespace("Questionnaire", description="handles the questions")
antecedents_namespace = Namespace("Antecedents", description="handles the antecedents of the users")

# Define data model for API documentation
user_model = api.model('User', {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
    'password': fields.String,
})

activity_model = api.model('Activity', {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'liked': fields.Integer,
    'tracked': fields.Integer,
    'imageUrl': fields.String,
})

question_model = api.model('Questionnaire',{
'id': fields.Integer,
'question': fields.String,
'type': fields.String,
'answer': fields.String

})

antecendents_model = api.model ('Antecedents', {
'age': fields.Integer,
'height': fields.Float,
'weight': fields.Float,
'bmi': fields.Float,
'gender': fields.String,
'smoking': fields.String,
'alcohol': fields.String,
'activtyLevel': fields.String,

})

# Define API routes

@auth_namespace.route('/login')
class Authentication(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter_by(username=username, password=password).first()
        if user is not None:
            return jsonify({'success': True})
        else:
            return jsonify({'success': False})


@auth_namespace.route('/register')
class Authentication(Resource):
    def post(self):
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
    



antecedents_model = api.model('Antecedents', {
    'age': fields.Integer,
    'height': fields.Float,
    'weight': fields.Float,
    'bmi':fields.Float,
    'gender': fields.String,
    'smoking': fields.String,
    'alcohol': fields.String,
    'activityLevel': fields.String
})

@antecedents_namespace.route('/')
class Antecedents(Resource):
    @api.expect(antecedents_model)
    def post(self):
        antecedents = request.json

        # Validate required fields
        required_fields = ['age', 'height', 'weight', 'bmi', 'gender', 'activityLevel']
        for field in required_fields:
            if field not in antecedents:
                return {'error': f'{field} is required'}, 400

        # Validate age
        if 'age' in antecedents and antecedents['age'] < 0:
            return {'error': 'Age must be a positive integer'}, 400

        # Validate height
        if 'height' in antecedents and (antecedents['height'] < 0 or antecedents['height'] > 3):
            return {'error': 'Height must be between 0 and 3 meters'}, 400

        # Validate weight
        if 'weight' in antecedents and antecedents['weight'] < 0:
            return {'error': 'Weight must be a positive number'}, 400

        # Validate bmi
        if 'bmi' in antecedents and antecedents['bmi'] < 0:
            return {'error': 'BMI must be a positive number'}, 400
        # Validate gender
        valid_genders = ['male', 'female', 'other']
        if 'gender' in antecedents and antecedents['gender'].lower() not in valid_genders:
            return {'error': f'Gender must be one of {", ".join(valid_genders)}'}, 400

        # Validate smoking
        valid_smoking_values = ['not_at_all', 'occasional', 'regular']
        if 'smoking' in antecedents and antecedents['smoking'].lower() not in valid_smoking_values:
            return {'error': f'Smoking must be one of {", ".join(valid_smoking_values)}'}, 400

        # Validate alcohol
        valid_alcohol_values = ['not_at_all', 'occasional', 'regular']
        if 'alcohol' in antecedents and antecedents['alcohol'].lower() not in valid_alcohol_values:
            return {'error': f'Alcohol must be one of {", ".join(valid_alcohol_values)}'}, 400

        # Validate activityLevel
        valid_activity_levels = ['low', 'moderate', 'high', 'very_high']
        if 'activityLevel' in antecedents and antecedents['activityLevel'].lower() not in valid_activity_levels:
            return {'error': f'Activity level must be one of {", ".join(valid_activity_levels)}'}, 400

        # If all validations pass, return success message
        return {'success': True}, 200





    
@userProfile_namespace.route('/')
class UserProfiles(Resource):
    def get(self):
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter_by(username=username, password=password).first()
        if user is not None:
             # get user data
            user_data = {
            'username': user.username,
            'password': user.password,
            'email': user.email
        }
            return jsonify({'success': True, 'user_data': user_data})
        else:
            return jsonify({'success': False})



# GET and PUT all activities
@activity_namespace.route('/')
class ActivityList(Resource):
    def get(self):
        activities = Activity.query.order_by(Activity.id.asc()).all()
        return jsonify([activity.to_dict() for activity in activities])
    
    @activity_namespace.expect(activity_model)
    def post(self):
        activity = Activity(**request.json)
        db.session.add(activity)
        db.session.commit()
        return activity.to_dict(), 201

# GET, PUT and DELETE single activity by ID
@activity_namespace.route('/<int:id>')
class ActivityDetail(Resource):
    def get(self, id):
        activity = Activity.query.filter_by(id=id).first()
        if activity is None:
            return {'message': 'Activity not found'}, 404
        else:
            return activity.to_dict()
        
    @activity_namespace.expect(activity_model)
    def put(self, id):
        activity = Activity.query.filter_by(id=id).first()
        if activity is None:
            return {'message': 'Activity not found'}, 404
        else:
            activity.name = request.json.get('name', activity.name)
            activity.description = request.json.get('description', activity.description)
            activity.liked = request.json.get('liked', activity.liked)
            activity.tracked =request.json.get('tracked', activity.tracked)
            db.session.commit()
            return activity.to_dict()
        
    def delete(self, id):
        activity = Activity.query.filter_by(id=id).first()
        if activity is None:
            return {'message': 'Activity not found'}, 404
        else:
            db.session.delete(activity)
            db.session.commit()
            return {'message': 'Activity deleted'} 


#like and dislike actvities

@activity_namespace.route('/like/<int:activity_id>')
class ActivityDetail(Resource): 
    def put(self,activity_id):
        activity = Activity.query.get_or_404(activity_id)
        if activity.liked :
            activity.liked += 1
        else:
            activity.liked = 1
        db.session.commit()
        return activity.to_dict()


@activity_namespace.route('/dislike/<int:activity_id>')
class ActivityDetail(Resource): 
    def put(self,activity_id):
        activity = Activity.query.get_or_404(activity_id)
        if activity.liked :
            activity.liked -= 1
        else:
            activity.liked = -1
        db.session.commit()
        return activity.to_dict()


@activity_namespace.route('/tracked/<int:activity_id>')
class ActivityDetail(Resource): 
    def put(self,activity_id):
        activity = Activity.query.get_or_404(activity_id)
        if activity.tracked :
            activity.tracked += 1
        else:
            activity.tracked = 1
        db.session.commit()
        return activity.to_dict()



#yes - no Questions
@question_namespace.route('/typeone')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == '1').order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])

    @question_namespace.expect(question_model)
    def post(self):
        questionnaire = Questionnaire(**request.json)
        db.session.add(questionnaire)
        db.session.commit()
        return questionnaire.to_dict(), 201



# offene Fragen
@question_namespace.route('/typetwo')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == '2').order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])

    @question_namespace.expect(question_model)
    def post(self):
        questionnaire = Questionnaire(**request.json)
        db.session.add(questionnaire)
        db.session.commit()
        return questionnaire.to_dict(), 201
    





api.add_namespace(auth_namespace)
api.add_namespace(activity_namespace)
api.add_namespace(userProfile_namespace)
api.add_namespace(question_namespace)
api.add_namespace(antecedents_namespace)

if __name__ == '__main__':
    app.run(debug=True)


