const router = require('express').Router()
const User = require('../db').import('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24}) //One day

            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        },
        createError = err => res.send(500, err)
    )
})

router.post('/signin', (req, res) => {
    User.findOne({ where: { email: req.body.email }})
    .then(
        user => {
            if(user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24}) //One day

                        res.json({
                            user: user,
                            message: 'successfully authenticated',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({ error: 'Jessie, Bad Boy.' })
                    }
                })
            } else{
                res.status(500).send({ error: 'This is why you fail' })
            }
        },
        err => res.status(501).send({ error: 'failed to process' })
    )
})

module.exports = router