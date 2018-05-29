from lib2to3.refactor import _identity

from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
import hashlib
from model import User, db

parser = reqparse.RequestParser()
parser.add_argument('username', help = 'Username cannot be blank', required = True)
parser.add_argument('password', help = 'Password cannot be blank', required = True)

class UserRegistration(Resource):
    def post(self):
        #try:
            data = parser.parse_args()
            print(hashlib.md5(data['password'].encode()).hexdigest())
            if User.query.filter(User.username==data['username']).first():
                return {"error" : "User already exists"}

            u = User(username=data['username'], password=hashlib.md5(data['password'].encode()).hexdigest())
            u.save()

            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            return {
                'username': data['username'],
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        #except:
         #   raise Exception()

class UserLogin(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            current_user = User.query.filter(User.username==data['username']).first()

            if not current_user:
                return {"error":"User not in DB. Register as a new user"}

            password = hashlib.md5(data['password'].encode()).hexdigest()
            if current_user.password == password :
                access_token = create_access_token(identity=data['username'])
                refresh_token = create_refresh_token(identity=data['username'])
                return {
                    'username': current_user.username,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            else:
                return {'error': 'Wrong credentials'}
        except:
            raise Exception("Cannot login user")
