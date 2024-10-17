const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => res.render('home'));

// About Me page route
router.get('/about', (req, res) => res.render('about'));

// Projects page route
router.get('/projects', (req, res) => res.render('projects'));

// Contact page route
router.get('/contact', (req, res) => res.render('contact'));

module.exports = router;
