# node-rest-api-example


## Changes in Configuation:

1. Go to config/db.config.js

Change below credentials accordingly

```
const dbConn = mysql.createConnection({
  // please replace this with your hostname / IP Address
  host     : 'localhost',
  // Please replace this with your username
  user     : 'root',
  // Please replace this with your password
  password : 'My@#$Password878',
  database : 'school_db'
});
```

> git checkout feature/auth-rsa

Once you are into `feature/auth-rsa` branch, please do `npm install`.

1. Please do post call on below API for sign-in (Authentication)
use username and password provided to you

POST - http://localhost:5345/api/v1/student/signin
Body - 
{"username":"XXXXX","password":"XXXXX"}

2. Once you do successful sign-in, then only you would be able to talk to other end-points

GET - http://localhost:5345/api/v1/student  , Retrieve all the students information

GET - http://localhost:5345/api/v1/student/1008 , Retrieve only information about specific student by passing GR Number at the end of the endpoint

PUT - http://localhost:5345/api/v1/student/1008 , for the updating student information, by passing GR Number at the end of the endpoint
Body:

```
{
       "standard": 2
}
```

DELETE - http://localhost:5345/api/v1/student/1008, to delete specific student information by passing GR Number at the end of the endpoint

POST - http://localhost:5345/api/v1/student/, for adding new student for admission confirmation

Body:

```
{
        "std_id": 9,
        "gr_no": 1004,
        "first_name": "David",
        "middle_name": "J",
        "last_name": "Whitfield",
        "standard": 1,
        "city": "Bangalore",
        "state": "Karnataka"
}
```

curl -X POST -H "Content-Type: application/json" \
    -d '{"username":"user1","password":"password1"}' \
    http://localhost:5345/api/v1/student/signin


curl http://localhost:5345/api/v1/student/