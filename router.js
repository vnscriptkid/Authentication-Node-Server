const authRouter = require('./routes/authRouter');

module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.send({ it: 'works!' })
    })

    // /auth
    app.use('/auth', authRouter);

    // /posts

    // /users
}