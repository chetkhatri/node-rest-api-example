const jwt = require('jsonwebtoken')
const fs = require('fs')
const bcrypt = require('bcrypt')

const PUBLIC_KEY = fs.readFileSync(__dirname + '/public_key.pem', 'utf8')
const PRIVATE_KEY = fs.readFileSync(__dirname + '/private_key.pem', 'utf8')

const jwtExpirySeconds = 300

const users = {
  user1: '$2b$12$nBsHay8/r0Ac9HdGXS.9q.v8Y4L0spoN7tmmWkzfVgISW5XJVjmyq',
  user2: '$2b$12$kBAmYIAv490gBiOBt.Eqkew1x3BV6VUiqLjz4BvtxL8m579390/8y'
}

const saltRounds = 12;

const signIn = (req, res) => {
  // Get credentials from JSON body
  const { username, password } = req.body
  if (!username || !password || !bcrypt.compareSync(password, users[username])) {
    // return 401 error is username or password doesn't exist, or if password does
    // not match the password in our records
    return res.status(401).end()
  }
  
  // Create a new token with the username in the payload
  // and which expires 300 seconds after issue
  const token = jwt.sign({ username }, PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: jwtExpirySeconds
  })
  
  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
  res.send("Authentication Successful!")
  res.end()
}

const welcome = (req, res) => {
  // We can obtain the session token from the requests cookies, which come with every request
  const token = req.cookies.token

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end()
  }

  var payload
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end()
    }
    // otherwise, return a bad request error
    return res.status(400).end()
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  res.send(`Welcome ${payload.username}!`)
}

const refresh = (req, res) => {
  // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
  const token = req.cookies.token

  if (!token) {
    return res.status(401).end()
  }

  var payload
  try {
  
  payload = jwt.verify(token, PUBLIC_KEY, { 
      // Never forget to make this explicit to prevent
      // signature stripping attacks.
    algorithms: ['RS256'] })

  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end()
    }
    return res.status(400).end()
  }
  // (END) The code uptil this point is the same as the first part of the `welcome` route

  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end()
  }

  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ username: payload.username }, PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: jwtExpirySeconds
  })

  // Set the new token as the users `token` cookie
  res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
  res.end()
}

module.exports = {
  signIn,
  welcome,
  refresh,
  jwt,
  PUBLIC_KEY,
  jwtExpirySeconds,
  users

}