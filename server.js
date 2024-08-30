// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db/database'); // Import the database module

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/auth', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if (email && password) {
        db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                res.redirect('/home');
            } else {
                res.status(401).send('Incorrect Email and/or Password!');
            }
        });
    } else {
        res.status(400).send('Please enter Email and Password!');
    }
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    db.query('INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password], (error, results, fields) => {
        if (error) throw error;
        res.redirect('/login');
    });
});

app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(path.join(__dirname, 'public', 'home.html'));
    } else {
        res.redirect('/login');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
