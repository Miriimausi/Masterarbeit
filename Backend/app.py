from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask
from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, Email
from flask_restx import Resource, Namespace

#hello


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/mydatabase'
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    liked =db.Column(db.Boolean(False), nullable = False)

class QuestionnaireForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    age = StringField('Age', validators=[DataRequired()])
    gender = StringField('Gender', validators=[DataRequired()])
    question1 = TextAreaField('Question 1', validators=[DataRequired()])
    question2 = TextAreaField('Question 2', validators=[DataRequired()])
    question3 = TextAreaField('Question 3', validators=[DataRequired()])
    submit = SubmitField('Submit')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username, password=password).first()
        if user:
            # set user session and redirect to activities page
            return redirect(url_for('activities'))
        else:
            # display error message on login page
            return render_template('login.html', error='Invalid credentials')
    else:
        return render_template('login.html')



@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        # set user session and redirect to login page
        return redirect(url_for('login'))
    else:
        return render_template('register.html')


@app.route('/activities')
def activities():
    sport_activities = Activity.query.all()
    return render_template('activities.html', sport_activities=sport_activities)


@app.route('/like_activity/<int:activity_id>', methods=['POST'])
def like_activity(activity_id):
    activity = Activity.query.get_or_404(activity_id)
    activity.liked = True
    db.session.commit()
    return redirect(url_for('activities'))

@app.route('/dislike_activity/<int:activity_id>', methods=['POST'])
def dislike_activity(activity_id):
    activity = Activity.query.get_or_404(activity_id)
    activity.liked = False
    db.session.commit()
    return redirect(url_for('activities'))


@app.route('/users')
def users():
    all_users = User.query.all()
    return render_template('users.html', users=all_users)


@app.route('/questionnaire', methods=['GET', 'POST'])
def questionnaire():
    form = QuestionnaireForm()
    if form.validate_on_submit():
        # Save questionnaire data to database or file
        return render_template('thank_you.html')
    return render_template('questionnaire.html', form=form)


if __name__ == '__main__':
    app.run(debug=True)