const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const rateLimitMiddleware = require('./config/ratelimiter');

// create express app
const app = express();
// Use Ratelimit Middleware
app.use(rateLimitMiddleware);

// Setup server port
const port = process.env.PORT || 5345;
// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use(session({
  secret: 'positronx',
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: (2 * 60 * 1000) 
  }
}));

app.use(helmet());
// HTTP Strict Transport Security (HSTS) header
app.use(helmet.hsts({
  maxAge: 1000 * 60 * 60 * 24 * 365,
  includeSubdomains: true,
  preload: true
}));

// Content Security Policy (CSP) header

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", "https"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    imgSrc: ["'self'", "https", "data:"],
    fontSrc: ["'self'", "https", "https://fonts.gstatic.com", "data:"],
    reportUri: '/report-violation',
  }
}));   

// Require employee routes
const studentRoutes = require('./routes/student.routes')

// using as middleware
app.use('/api/v1/student', studentRoutes)



app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    const error = {status: undefined, message: undefined, type: undefined, ...err}
    if (error.status === 400 && 'body' in err) {
      // res.status(400).json({ error: "Bad Request parameters!", message: error.message, type: error.type })
      res.status(400).send("The body of your request is not a valid JSON!");
    }
  }
});


// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

app.get('*', function(req, res){
  res.status(404).send("Resource Not found!")
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});