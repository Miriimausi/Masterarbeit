from flask_sqlalchemy import SQLAlchemy
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
    bmi = db.Column(db.Numeric(precision=5, scale=2), nullable=False)
    gender =db.Column(db.String)
    sleepDuration = db.Column(db.Numeric(precision=5, scale=2), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'age': self.age,
            'bmi': self.bmi,
            'gender': self.gender,
            'sleepDuration': self.sleepDuration
        }


# Initialize Flask-RestX API
api = Api(app, version='1.0', title='My App API',
          description='API for my app')

auth_namespace= Namespace("auth", description="handles authentication")
activity_namespace =Namespace("activities", description="handles activities")
userProfile_namespace =Namespace("UserProfile", description="handles the UserProfile")
question_namespace = Namespace("Questionnaire", description="handles the questions")
antecendents_namespace = Namespace("Antecedents", description="handles the antecedents of the users")

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
'id': fields.Integer,

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


if __name__ == '__main__':
    app.run(debug=True)


