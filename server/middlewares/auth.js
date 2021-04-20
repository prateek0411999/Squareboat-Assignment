import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {


    const token = req.headers.authorization.split(" ")[1];
    if (token === null) {
        res.status(401)
    }
    console.log('token we have', token)


    jwt.verify(token, 'test', (err, user) => {
        if (err) return res.status(403).json("NO access to this token")
        req.user = user
        next()
    })


}
export default auth;