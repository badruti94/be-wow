const jwt = require('jsonwebtoken')
exports.auth = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send({
            message: 'Access is denied'
        })
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = verified
        next()
    } catch (error) {
        res.status(401).send({
            message: 'Invalid token'
        })
    }
}


exports.authAdmin = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send({
            message: 'Access is denied'
        })
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY)
        if (verified.role !== 'admin') {
            return res.status(401).send({
                message: 'Access is denied'
            })
        }
        req.user = verified
        next()
    } catch (error) {
        res.status(401).send({
            message: 'Invalid token'
        })
    }
}