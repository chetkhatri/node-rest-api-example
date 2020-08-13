const rateLimit = require('express-rate-limit');

// Rate limit middleware
const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'You have exceeded your 10 requests per hour limit.',
  headers: true,
});

// Export it
module.exports = rateLimitMiddleware;