const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/generate-password', (req, res) => {
    const length = parseInt(req.query.length) || 8;
    let charset = '';

    if (req.query.alphabets === 'true') charset += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (req.query.numbers === 'true') charset += '0123456789';
    if (req.query.symbols === 'true') charset += '!@#$%^&*()_+~';

    if (!charset) return res.status(400).json({ error: 'Select at least one option' });

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    res.json({ password });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
