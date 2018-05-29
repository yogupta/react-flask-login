from flask import Flask,jsonify

from flask_restful import Api
from flask_jwt_extended import JWTManager

from model import User,db
import resources

app = Flask(__name__)
api = Api(app)

app.config['JWT_SECRET_KEY'] = 'boost-is-the-secret-of-our-app'
jwt=JWTManager(app)

@app.route('/')
def index():
    return jsonify({"message" : "hello, this is server :)"})

api.add_resource(resources.UserRegistration, '/register')
api.add_resource(resources.UserLogin, '/login')

if __name__ == "__main__":
    app.debug = True
    app.run(host='localhost', port=5000)
