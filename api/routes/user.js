const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/User')

router.get('/demo', function(req, res) {
  User.register(new User({ username: 'demo' }), 'demo', function() {
    res.redirect('/')
  })
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({ success: true })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

// 회원가입 API
router.post('/register', function(req, res) {
  const { username, password } = req.body;
  User.register(new User({ username }), password, function(err, user) {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.json({ success: true, user });
  });
});

module.exports = router
