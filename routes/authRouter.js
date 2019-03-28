const express = require('express');
const router = new express.Router();
const authControllers = require('../controllers/authControllers');
const requireAuth = require('../middlewares/requireAuth.js');
const requireLogin = require('../middlewares/requireLogin');
// all requests start with /auth/*

// GET /auth
router.get('/', requireAuth, (req, res, next) => {
    res.send({ authRoute: 'works!' });
});

// POST /auth/signup
router.post('/signup', authControllers.signup);

// POST /auth/signin
router.post('/login', requireLogin, authControllers.login);

// GET /auth/signout

module.exports = router;