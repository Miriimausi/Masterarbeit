
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
    social = db.Column(db.String)
    skill = db.Column(db.String)
    location = db.Column(db.String)
    emotional = db.Column(db.String)
    accessories = db.Column(db.String)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'imageUrl':self.imageUrl,
            'type':self.type,
            'intensity':self.intensity,
            'duration': self.duration,
            'accessories': self.accessories}


class Questionnaire(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(200), nullable=False)
    type = db.Column(db.Integer)


    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'type':self.type,
          
            
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
    socialPreference= db.Column(db.String)
    skillPreference= db.Column(db.String)
    locationPreference= db.Column(db.String)
    emotionalPreference= db.Column(db.String)
    accessoriesPreference = db.Column(db.String)
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
            'socialPreference':self.socialPreference,
            'skillPreference':self.skillPreference,
            'locationPreference':self.locationPreference,
            'emotionalPreference':self.emotionalPreference,
            ' accessoriesPreference':self. accessoriesPreference,

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
    'duration' : fields.String,
    'social': fields.String,
    'skill': fields.String,
    'location':fields.String,
    'emotional':fields.String,
    'accessories': fields.String
})

question_model = api.model('Questionnaire',{
    'id': fields.Integer,
    'question': fields.String,
    'type': fields.Integer,
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
    'socialPreference':fields.String,
    'skillPreference':fields.String,
    'locationPreference':fields.String,
    'emotionalPreference':fields.String,
    'accessoriesPreference':fields.String,
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
                            'isOnBoarded': user.isOnBoarded
                          }
            return jsonify({'success': True, 'user': user_data})
        else:
            return jsonify({'success': False})


@auth_namespace.route('/register')
class Authentication(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        
        if not username or not password:
            return jsonify({'success': False, 'error': 'Incomplete data'})
        
        existing_user = User.query.filter_by( username=username).first()
        if existing_user:
            return jsonify({'success': False, 'error': 'User already exists'})
        
        new_user = User( username=username, password=password)
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
        durationPreference = request.json.get('durationPreference')
        intensityPreference = request.json.get('intensityPreference')
        trainingPreference = request.json.get('trainingPreference')
        socialPreference = request.json.get('socialPreference')
        skillPreference = request.json.get('skillPreference')
        locationPreference = request.json.get('locationPreference')
        emotionalPreference = request.json.get('emotionalPreference')
        accessoriesPreference = request.json.get('accessoriesPreference')
        sleepScore = request.json.get('sleepScore')
        userId = request.json.get('userId')

        
        user = User.query.get(userId)
        userAntecedents = UserAntecedents.query.filter_by(userId=user.id).first()

        if userAntecedents is not None:
            return {'success': False, 'error': 'User already has related antecedents'}, 409

        if user is not None:
            new_antecedents = UserAntecedents(
                id=id, age=age, height=height, weight=weight, bmi=bmi,
                timeAvailability=timeAvailability,
                trainingPreference=trainingPreference,
                intensityPreference=intensityPreference,
                userId = user.id,
                sleepScore=sleepScore, durationPreference=durationPreference, socialPreference=socialPreference,
                skillPreference= skillPreference,
                locationPreference=locationPreference,
                accessoriesPreference=accessoriesPreference,
                emotionalPreference=emotionalPreference
            )

            if new_antecedents is not None:
                # Update the user's isOnBoarded field to True
                user.isOnBoarded = True
                db.session.add(new_antecedents)
                db.session.commit()

                return {'success': True}, 200

        # Return error message
        return {'success': False, 'error': 'User not found or invalid antecedents'}, 404
    



def calculate_modified_dice_coefficients(item: dict, other_items: list[Activity], modified_weights: dict = None):
    """
    Calculates the Dice coefficient for each item in the list, using the modified weights
    
    :param item: The item to compare against
    :param other_items: The list of items to compare against
    :param modified_weights: The modified weights to use for each attribute (optional) E.g. {'type': 1.5, 'intensity': 1.2}
    :return: A list of dictionaries containing the activity ID and similarity score
    """

    dice_coefficients = []

    attributes_to_use = ['type', 'intensity', 'duration', 'social', 'skill', 'location', 'emotional', 'accessories']

    if modified_weights is None:
        modified_weights = {}

    for attr in attributes_to_use:
        if attr not in modified_weights:
            modified_weights[attr] = 1

    for other_item in other_items:
        other_item_attributes = {attr: getattr(other_item, attr) for attr in attributes_to_use}

        oa_set = set(other_item_attributes.items())
        ia_set = set((attr, item[attr]) for attr in attributes_to_use)

        intersection = oa_set.intersection(ia_set)

        dice_coefficient = (2.0 * sum(modified_weights[attr] for attr, _ in intersection)) / (
            sum(modified_weights[attr] for attr, _ in oa_set) + 
            sum(modified_weights[attr] for attr, _ in ia_set))

        dice_coefficients.append({
            'activity_id': other_item.id, 
            'similarity_score': dice_coefficient}
        )

    dice_coefficients.sort(key=lambda x: x['similarity_score'], reverse=True)

    return dice_coefficients



@antecedents_namespace.route('/calculateSimilarity/<int:user_id>')
class Antecedents(Resource):
    def get(self, user_id):

        user = UserAntecedents.query.filter_by(userId=user_id).first()
        activities = Activity.query.all()

        if user is None:
            return {'success': False, 'error': 'User not found'}, 404
        
        current_prefs = {
            'type': user.trainingPreference if user.trainingPreference else '',
            'intensity': user.intensityPreference if user.intensityPreference else '',
            'duration': user.durationPreference if user.durationPreference else '',
            'social': user.socialPreference if user.socialPreference else '',
            'skill': user.skillPreference if user.skillPreference else '',
            'location': user.locationPreference if user.locationPreference else '',
            'emotional': user.emotionalPreference if user.emotionalPreference else '',
            'accessories': user.accessoriesPreference if user.accessoriesPreference else '',
        }
        
        modified_weights = {
            'type': 3,
            'intensity':1.5,
            'accessories':2
        }
        similarity_scores = calculate_modified_dice_coefficients(current_prefs, activities, modified_weights)


        # Create a dictionary to map activity IDs to their corresponding similarity scores
        similarity_dict = {item['activity_id']: item['similarity_score'] for item in similarity_scores}

        # Sort the activities based on the similarity scores
        activities.sort(key=lambda activity: similarity_dict.get(activity.id, 0), reverse=True)

        response_data = []
        for activity in activities:
            activity_data = {
                'id': activity.id,
                'name': activity.name,
                'imageUrl': activity.imageUrl,
                'description': activity.description,
                'similarity_score': similarity_dict.get(activity.id, 0),
                'type': activity.type,
                'intensity':activity.intensity,
                'duration': activity.duration,
                'social':activity.social,
                'skill':activity.skill,
                'location':activity.location,
                'emotional':activity.emotional,
                'accessories':activity.accessories

            }
            response_data.append(activity_data)

        return {
            'success': True,
            'activities': response_data
        }, 200
    
    @antecedents_namespace.route('/calculateRecommendation/<int:user_id>')
    class Antecedents(Resource):
        def post(self, user_id):
            user = UserAntecedents.query.filter_by(userId=user_id).first()
            activities = Activity.query.all()

            if user is None:
                return {'success': False, 'error': 'User not found'}, 404

            # Update user's preferences with the received data
            user.trainingPreference = request.json.get('trainingPreference')
            user.durationPreference = request.json.get('durationPreference')
            user.intensityPreference = request.json.get('intensityPreference')
            user.socialPreference = request.json.get('socialPreference')
            user.skillPreference = request.json.get('skillPreference')
            user.locationPreference = request.json.get('locationPreference')
            user.emotionalPreference = request.json.get('emotionalPreference')
            user.accessories = request.json.get('accessoriesPreference')
            db.session.commit()

            current_prefs = {
                'type': user.trainingPreference if user.trainingPreference else '',
                'intensity': user.intensityPreference if user.intensityPreference else '',
                'duration': user.durationPreference if user.durationPreference else '',
                'social': user.socialPreference if user.socialPreference else '',
                'skill': user.skillPreference if user.skillPreference else '',
                'location': user.locationPreference if user.locationPreference else '',
                'emotional': user.emotionalPreference if user.emotionalPreference else '',
                'accessories': user.accessories if user.accessories else '',
            }
            
            modified_weights = {
                'type': 3,
                'intensity':1.5,
                'accessories':2

            }
            similarity_scores = calculate_modified_dice_coefficients(current_prefs, activities, modified_weights)


            # Create a dictionary to map activity IDs to their corresponding similarity scores
            similarity_dict = {item['activity_id']: item['similarity_score'] for item in similarity_scores}

            # Sort the activities based on the similarity scores
            activities.sort(key=lambda activity: similarity_dict.get(activity.id, 0), reverse=True)

            response_data = []
            for activity in activities:
                activity_data = {
                    'id': activity.id,
                    'name': activity.name,
                    'imageUrl': activity.imageUrl,
                    'description': activity.description,
                    'similarity_score': similarity_dict.get(activity.id, 0),
                    'type': activity.type,
                    'intensity':activity.intensity,
                    'duration': activity.duration,
                    'social':activity.social,
                    'skill':activity.skill,
                    'location':activity.location,
                    'emotional':activity.emotional,
                    'accessories': activity.accessories
            

                }
                response_data.append(activity_data)

            return {
                'success': True,
                'activities': response_data
            }, 200



@antecedents_namespace.route('/getPreferences/<int:user_id>')
class Antecedents(Resource):
    def get(self, user_id):
        
        antecedent = UserAntecedents.query.filter_by(userId=user_id).first()
        if antecedent:
            return {'timeAvailability': antecedent.timeAvailability, 'trainingPreference': antecedent.trainingPreference, 'intensityPreference': antecedent.intensityPreference,'durationPreference': antecedent.durationPreference, 'socialPreference': antecedent.socialPreference, 'skillPreference': antecedent.skillPreference, 'locationPreference': antecedent.locationPreference, 'emotionalPreference': antecedent.emotionalPreference, 'accessoriesPreference':antecedent.accessoriesPreference}, 200
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

@question_namespace.route('/<int:typeId>')
class Questions(Resource):
    def get(self, typeId):
        questionnaires = Questionnaire.query.filter(Questionnaire.type == typeId).order_by(Questionnaire.id.asc()).all()
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
        type = request.json.get('type')
    

        new_questions = Questions(id=id, question=question, type=type)
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
 

