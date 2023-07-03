
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Resource, Api, fields, Namespace
from flask import Flask, request, jsonify
from flask import redirect, url_for
from decimal import Decimal
import json
from difflib import SequenceMatcher
from flask import Flask, request
from flask_restx import Resource
import requests



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
    imageUrl =db.Column(db.String)
    type = db.Column(db.String)
    intensity = db.Column(db.String)
    duration = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'imageUrl':self.imageUrl,
            'type':self.type,
            'intensity':self.intensity,
            'duration': self.duration}


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
    height= db.Column (db.Numeric(precision=5, scale=2),nullable= False)
    weight= db.Column (db.Numeric(precision=5, scale=2),nullable= False)
    bmi = db.Column(db.Numeric(precision=5, scale=2), nullable=False)
    timeAvailability= db.Column(db.String)
    trainingPreference= db.Column(db.String)
    durationPreference= db.Column(db.String)
    intensityPreference= db.Column(db.String)
    userId =db.Column(db.Integer)
    sleepScore =db.Column(db.Integer)


    def to_dict(self):
        return {
            'id': self.id,
            'age': self.age,
            'height': self.height,
            'weight': self.weight,
            'bmi': self.bmi,
            'timeAvailability': self.timeAvailability,
            'trainingPreference': self.trainingPreference,
            'durationPreference': self.durationPreference,
            'intensityPreference': self.intensityPreference,
            'userID':self.userId,
            'sleepScore':self.sleepScore
            
        }


#Initialize Flask-RestX API
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

user_login_model = api.model('UserLogin', {
    'username': fields.String,
    'password': fields.String,

})

activity_model = api.model('Activity', {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'imageUrl': fields.String,
    'type': fields.String,
    'intensity': fields.String,
    'duration' : fields.String
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
    'timeAvailability': fields.String,
    'trainingPreference': fields.String,
    'durationPreference': fields.String,
    'intensityPreference':fields.String,
    'userId': fields.Integer,
    'sleepScore': fields.Integer
})

# Define API routes
@auth_namespace.route('/login', methods=["POST"])
class Authentication(Resource):
    @auth_namespace.expect(user_login_model)
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
    
@antecedents_namespace.route('/onboarding')
class Antecedents(Resource):
    @api.expect(antecedents_model)
    def post(self):
        id = request.json.get('id')
        age = request.json.get('age')
        height = request.json.get('height')
        weight = request.json.get('weight')
        bmi = request.json.get('bmi')
        timeAvailability = request.json.get('timeAvailability')
        trainingPreference = request.json.get('trainingPreference')
        durationPreference = request.json.get('durationPreference')
        intensityPreference = request.json.get('intensityPreference')
        sleepScore = request.json.get('sleepScore')
        userId = request.json.get('userId')

        
        user = User.query.get(userId)
        userAntecedents = UserAntecedents.query.filter_by(userId=user.id).first()

        if userAntecedents is not None:
            return {'success': False, 'error': 'User already has related antecedents'}, 404

        if user is not None:
            new_antecedents = UserAntecedents(
                id=id, age=age, height=height, weight=weight, bmi=bmi,
                timeAvailability=timeAvailability,
                trainingPreference=trainingPreference,
                intensityPreference=intensityPreference,
                userId = user.id,
                sleepScore=sleepScore, durationPreference=durationPreference
            )

            if new_antecedents is not None:
                # Update the user's isOnBoarded field to True
                user.isOnBoarded = True
                db.session.add(new_antecedents)
                db.session.commit()

                return {'success': True}, 200

        # Return error message
        return {'success': False, 'error': 'User not found or invalid antecedents'}, 404



# def calculate_dice_coefficient(str1, str2):
#     # Convert the strings to sets of characters
#     set1 = set(str1)
#     set2 = set(str2)

#     # Calculate the intersection and union of the sets
#     intersection = len(set1 & set2)
#     union = len(set1) + len(set2)

#     # Calculate the Dice coefficient
#     dice_coefficient = (2 * intersection) / union

#     return dice_coefficient

def calculate_dice_coefficients(item: dict, other_items: list[Activity]) -> list[dict]:
    # Calculate the Dice coefficient for each item in the list
    dice_coefficients = []
    for other_item in other_items:
        # only use type, intensity and duration for now
        item_attributes = [item.type, item.intensity, item.duration]
        other_item_attributes = [other_item.type, other_item.intensity, other_item.duration]

        set1 = set(item_attributes)
        set2 = set(other_item_attributes)

        # Calculate the intersection and union of the sets
        intersection = len(set1 & set2)
        union = len(set1) + len(set2)

        # Calculate the Dice coefficient
        dice_coefficient = (2 * intersection) / union

        dice_coefficients.append({
            'activity_id': other_item.id,
            'similarity_score': dice_coefficient
        })
    return dice_coefficients


# @antecedents_namespace.route('/calculateSimilarity')
# class Antecedents(Resource):
#     @api.expect(antecedents_model)
#     def post(self):
#         trainingPreference = request.json.get('trainingPreference')
#         timeAvailability = request.json.get('timeAvailability')
#         durationPreference = request.json.get('durationPreference')
#         intensityPreference = request.json.get('intensityPreference')
        
#         activities = Activity.query.all()
#         similarity_score_training = []
#         similarity_score_time = []
#         similarity_score_duration = []
#         similarity_score_intensity =[]
        
#         for activity in activities:
#             activity_type = activity.type
            
#             # Calculate similarity score for trainingPreference
#             similarity_score_training.append({
#                 'activity_id': activity.id,
#                 'similarity_score': calculate_dice_coefficient(activity_type, trainingPreference)
#             })
            
#             # Calculate similarity score for timeAvailability
#             similarity_score_time.append({
#                 'activity_id': activity.id,
#                 'similarity_score': calculate_dice_coefficient(activity_type, timeAvailability)
#             })
            
#             # Calculate similarity score for durationPreference
#             similarity_score_duration.append({
#                 'activity_id': activity.id,
#                 'similarity_score': calculate_dice_coefficient(activity_type, durationPreference)
#             })
#              # Calculate similarity score for intensityPrefernce
#             similarity_score_intensity.append({
#                 'activity_id': activity.id,
#                 'similarity_score': calculate_dice_coefficient(activity_type, intensityPreference)
#             })


#         return {
#             'success': True,
#             'similarity_scores_training': similarity_score_training,
#             'similarity_scores_time': similarity_score_time,
#             'similarity_scores_duration': similarity_score_duration,
#             'similarity_scores_intensity': similarity_score_intensity
#         }, 200


@antecedents_namespace.route('/calculateSimilarity')
class Antecedents(Resource):
    @api.expect(antecedents_model)
    def post(self):
        trainingPreference = request.json.get('trainingPreference')
        timeAvailability = request.json.get('timeAvailability')
        durationPreference = request.json.get('durationPreference')
        intensityPreference = request.json.get('intensityPreference')
        
        activities = Activity.query.all()

        current_item = {
            'type': trainingPreference,
            'intensity': intensityPreference,
            'duration': durationPreference
        }

        similarity_scores = calculate_dice_coefficients(current_item, activities)

        return {
            'success': True,
            'similarity_scores': similarity_scores
        }, 200


# def fetch_activity_details(sorted_activity_ids):
#     activity_details = []
#     base_url = 'http://10.0.2.2:5000/Antecedents/getActivityDetails/'
    
#     for activity_id in sorted_activity_ids:
#         activity_url = base_url + str(activity_id)
#         try:
#             response = requests.get(activity_url)
#             data = response.json()
#             if data['success'] and data['activity']:
#                 activity_details.append(data['activity'])
#         except requests.exceptions.RequestException as error:
#             print(f"Error fetching activity details for ID {activity_id}: {error}")
    
#     return activity_details



@antecedents_namespace.route('/getPreferences/<int:user_id>')
class Antecedents(Resource):
    def get(self, user_id):
        
        antecedent = UserAntecedents.query.filter_by(userId=user_id).first()
        if antecedent:
            return {'timeAvailability': antecedent.timeAvailability, 'trainingPreference': antecedent.trainingPreference, 'intensityPreference': antecedent.intensityPreference}, 200
        else:
            return {'message': 'Antecedent not found'}, 404
        


@antecedents_namespace.route('/getScore/<int:user_id>')
class Antecedents(Resource):
    def get(self, user_id):
        
        antecedent = UserAntecedents.query.filter_by(userId=user_id).first()
        if antecedent:
            return {'sleepScore': antecedent.sleepScore}, 200
        else:
            return {'message': 'Antecedent not found'}, 404
        
    

@antecedents_namespace.route('/putScore')
class Antecedents(Resource):
    def put(self):
        sleep_score = request.json.get('sleepScore')
        user_id = request.json.get('userId')
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

               
@activity_namespace.route('/')
class ActivityList(Resource):
    def get(self):
        activities = Activity.query.order_by(Activity.id.asc()).all()
        return jsonify([activity.to_dict() for activity in activities])
    


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
#     with app.app_context():
#         recreate_db()
    app.run(debug=True)
   # recreate_db()

