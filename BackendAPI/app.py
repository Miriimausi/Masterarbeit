
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
#from flask_migrate import Migrate
#from flask_wtf import FlaskForm
#from wtforms import StringField, TextAreaField, SubmitField
#from wtforms.validators import DataRequired, Length, Email
from flask_restx import Resource, Api, fields, Namespace
from flask import Flask, request, jsonify
from flask import redirect, url_for
from decimal import Decimal
import json


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/mydatabase'
db = SQLAlchemy(app)



# Define data models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    isOnBoarded = db.Column(db.Boolean, nullable=False, default=False)

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
    type = db.Column(db.Integer)
    answer =db.Column(db.String)
    score =db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'type':self.type,
            'answer': self.answer,
            'score': self.score,
            
            }
    

class UserAntecedents(db.Model):

    __tablename__="userAntecedents"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    age = db.Column(db.Integer, nullable=False)
    height= db.Column (db.Numeric(precision=2, scale=2),nullable= False)
    weight= db.Column (db.Numeric(precision=2, scale=2),nullable= False)
    bmi = db.Column(db.Numeric(precision=5, scale=2), nullable=False)
    gender =db.Column(db.String, nullable=False)
    timeAvailability= db.Column(db.String)
    trainingPreference= db.Column(db.String)
    favoriteActivities= db.Column(db.String)
    userId =db.Column(db.Integer)
    sleepScore =db.Column(db.Integer)


    def to_dict(self):
        return {
            'id': self.id,
            'age': self.age,
            'height': self.height,
            'weight': self.weight,
            'bmi': self.bmi,
            'gender': self.gender,
            'timeAvailability': self.timeAvailability,
            'trainingPreference': self.trainingPreference,
            'favoriteActivities': self.favoriteActivities,
            'userID':self.userId,
            'sleepScore':self.sleepScore
            
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
    'type': fields.Integer,
    'answer': fields.String,
    'score': fields.String,

})


antecedents_model = api.model('Antecedents', {
    'id': fields.Integer,
    'age': fields.Integer,
    'height': fields.Float,
    'weight': fields.Float,
    'bmi':fields.Float,
    'gender': fields.String,
    'timeAvailability': fields.String,
    'trainingPreference': fields.String,
    'favoriteActivities': fields.String,
    'userId': fields.Integer,
    'sleepScore': fields.Integer
})

# Define API routes

@auth_namespace.route('/login')
class Authentication(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter_by(username=username, password=password).first()
        if user is not None:
            user_data = {
                            'id': user.id,
                            'username': user.username,
                            'password': user.password,
                            'email': user.email,
                            'isOnBoarded': user.isOnBoarded
                          }
            return jsonify({'success': True, 'user': user_data})
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
    




@antecedents_namespace.route('/')
class Antecedents(Resource):
    @api.expect(antecedents_model)
    def post(self):
        id =request.json.get('id')
        age = request.json.get('age')
        height = request.json.get('height')
        weight = request.json.get('weight')
        bmi = request.json.get('bmi')
        gender = request.json.get('gender')
        timeAvailability = request.json.get('timeAvailability')
        trainingPreference = request.json.get('trainingPreference')
        favoriteActivities = request.json.get('favoriteActivities')
        userId = request.json.get('userId')

        user = User.query.get(userId)

        if user is not None:
                   new_antecedents = UserAntecedents(id=id, age=age, height=height, weight=weight, bmi=bmi,
                                                     gender=gender, timeAvailability=timeAvailability,
                                                     trainingPreference=trainingPreference,
                                                     favoriteActivities=favoriteActivities)

                   if new_antecedents is not None:
                       # Update the user's isOnBoarded field to True
                       user.isOnBoarded = True

                       db.session.add(new_antecedents)
                       db.session.commit()

                       # Return success message
                       return {'success': True}, 200
        # Return success message
        return {'success': False, 'error': 'User not found or invalid antecedents'}, 404


#Momentan nur für den user mit der userId 1 möglich
@antecedents_namespace.route('/getScore')
class Antecedents(Resource):
    def get(self):
        user_id = 1
        antecedent = UserAntecedents.query.filter_by(userId=user_id).first()
        if antecedent:
            return {'sleepScore': antecedent.sleepScore}, 200
        else:
            return {'message': 'Antecedent not found'}, 404

@antecedents_namespace.route('/putScore')
class Antecedents(Resource):
    def put(self):
        user_id = 1
        sleep_score = request.json.get('sleepScore', {}).get('allComponentScores')
        if sleep_score is None:
            return {'message': 'Invalid sleep score'}, 400
        
        antecedent = UserAntecedents.query.filter_by(userId=user_id).first()
        if antecedent:
            antecedent.sleepScore = sleep_score
            db.session.commit()
            return {'message': 'Sleep score updated successfully'}, 200
        else:
            return {'message': 'Antecedent not found'}, 404


    
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



#Questions
@question_namespace.route('/typeone')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 1).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])
    
    #Questions
@question_namespace.route('/typetwo')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 2).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])
    
@question_namespace.route('/typethree')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 3).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])
    

@question_namespace.route('/typefour')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 4).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])
    
@question_namespace.route('/typefive')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 5).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])
    
@question_namespace.route('/typesix')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 6).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])
    
@question_namespace.route('/typeseven')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 7).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])

@question_namespace.route('/typeeight')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 8).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])     

@question_namespace.route('/typenine')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 9).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])  
    
@question_namespace.route('/typeten')
class Questions(Resource):
    def get(self):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == 10).order_by(Questionnaire.id.asc()).all()
        return jsonify([questionnaire.to_dict() for questionnaire in questionnaires])


@question_namespace.route('/all')
class Questions(Resource):
    @api.marshal_with(question_model, as_list=True)
    def get(self):
        questionnaires = Questionnaire.query.order_by(Questionnaire.id.asc()).all()
        return questionnaires

    @api.expect(question_model)
    def post(self):
        id = request.json.get('id')
        question = request.json.get('question')
        answer =request.json.get('answer')
        type = request.json.get('type')
        score =request.json.get('score')

        new_questions = Questions(id=id, question=question, answer=answer, type=type)
        db.session.add(new_questions)
        db.session.commit()   


@question_namespace.route('/answers')
class QuestionAnswers(Resource):
    @api.marshal_with(question_model, as_list=True)
    def get(self):
        answers = Questionnaire.query.with_entities(Questionnaire.id, Questionnaire.answer).all()
        return answers
               
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



def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


api.add_namespace(auth_namespace)
api.add_namespace(activity_namespace)
api.add_namespace(userProfile_namespace)
api.add_namespace(question_namespace)
api.add_namespace(antecedents_namespace)

if __name__ == '__main__':
    #with app.app_context():
        #recreate_db()
    app.run(debug=True)
   # recreate_db()

