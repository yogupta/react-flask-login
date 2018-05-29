# react-flask-login

### Installation

##### Running the backend.
steps : Install all the dependencies
 - ```pip install -r requirements.txt```
 - ```python server.py```
 - ```server running at port:5000```

Api- ```http://localhost:5000/login``` - user login
   - ```http://localhost:5000/register``` - user register
	
##### Running the Frontend.
steps:
 - ```npm install``` or ```yarn install```
 - ```npm start``` or ```yarn start```
 - ```server running at port:3000```
	
Test username - ```testuser@coutloot.com```.
Test password - ```testuser```.
You can also have your own login	

***

- Frontend is build using React.
- Backend is build using Flask.
- Mongo server is running in cloud at mlab.com.
- Flask-MongoAlchemy is used to communicate between mongo and server.
- I have used JWT for login using flask JWTManager.
- I have used flask_restful for creating Api endpoints.
 

> sending email could be achieved by using a smtp server but due to time constraints I haven't added that part
