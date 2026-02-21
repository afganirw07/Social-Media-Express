import { rateLimit } from "express-rate-limit"

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: "Terlalu banyak request. Coba lagi dalam 1 menit."
    }
})

export default rateLimiter