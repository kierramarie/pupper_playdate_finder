const users = require('../database/users')

module.exports = function (passport, pool) {
    const authenticate = passport.authenticate('local')

    return {
        async login (req, res, next) {
            authenticate(req, res, err => {
                if (err) return next(err)

                res.cookie('user', JSON.stringify(req.user.id), {
                    maxAge: 36000000 // expires in 10 hours
                })
                res.enforcer.status(200).send()
            })
            //let user = await users.getUserByUsername(pool, req.user.username)
            
        },

        logout (req, res) {
            if (req.user) req.logout()
            res.enforcer.status(200).send()
        }
    }
}