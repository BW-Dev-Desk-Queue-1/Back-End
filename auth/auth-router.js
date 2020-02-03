const router = require('express').Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets.js')
const Users = require('../users/userModel.js')
const Helpers = require('../helpers/helperModel.js')

router.post('/register', (req, res, next) => {
    let user = req.body

    const hash = bcrypt.hashSync(user.password, 5); // 2 ^ n

    user.password = hash;
    if(user.accessType === 'student') {
        // console.log(user)
        Users.addUser(user)
            .then(saved => {
                res.status(201).json({...user, password: '*******'});
            })
            .catch(error => {
                next(error);
            })

    } else {
        Helpers.addHelper(user)
            .then(saved => {
                res.status(201).json({...user, password: '*******'});
            })
            .catch(error => {
                next(error);
            })
    }
    
})

router.post('/login', (req, res, next) => {
    let { username, password, accessType } = req.body

    if(accessType === 'student') {
        Users.findByUserName( username )
        .first()
        .then(user => {

           return sendResultToUser(req, res, next, user)
        })
        .catch(error => {
            next(error);
        })

    } else {
        Helpers.findByHelperName( username )
        .first()
        .then(user => {

           return sendResultToUser(req, res, next, user)
        })
        .catch(error => {
            next(error);
        })
    }
})

//hoisted to top of scope
function signToken(user) {

    const payload = {
        userId: user.id,
        username: user.username,
        userAccessType: user.accessType
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options)
}

function sendResultToUser(req, res, next, user) {
    if(user && bcrypt.compareSync(password, user.password)) {
                
        const token = signToken(user)

        res.status(200).json({ token })

    } else {
        res.status(401).json({ message: 'Invalid Credentials'})
    }
}
module.exports = router
