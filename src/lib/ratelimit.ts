import rateLimit from 'express-rate-limit'

const apiRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit requests to 10
    message: { error: 'rateLimited', message: 'You have been rate limited. Please try again in 1 hour', status: 429 },
    statusCode: 429
})

export default apiRateLimit