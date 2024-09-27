// server.js
const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const speakeasy = require('speakeasy');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = {}; // In-memory user storage

// Register User
app.post('/api/register', (req, res) => {
    debugger
    const { username, password, token } = req.body;
    const user = users[username];

    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Verify TOTP token
    const verified = speakeasy.totp.verify({
        secret: req.body.secret,
        encoding: 'base32',
        token
    });

    if (verified) {
        // Store user with secret
        users[username] = {
            password,
            secret: req.body.secret
        };
        res.json({ message: 'User registered' });
    } else {
        res.status(400).json({ message: 'Invalid token' });
    }
});

// Generate QR Code
app.post('/api/qrcode', (req, res) => {
    debugger
    const { username } = req.body;
    const secret = speakeasy.generateSecret({ length: 200, name: username });

    // Generate otpauth URL
    const otpauthUrl = secret.otpauth_url;

    // Generate QR code
    QRCode.toDataURL(otpauthUrl, (err, data_url) => {
        res.json({ qrCode: data_url, secret: secret.base32 });
    });
});

// Login User
app.post('/api/login', (req, res) => {
    debugger
    const { username, password, token } = req.body;
    const user = users[username];

    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify TOTP token
    const verified = speakeasy.totp.verify({
        secret: user.secret,
        encoding: 'base32',
        token
    });

    if (verified) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(400).json({ message: 'Invalid token' });
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
