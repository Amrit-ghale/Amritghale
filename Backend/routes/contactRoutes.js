const express = require('express');
const router = express.Router();

// POST request for handling contact form submissions
router.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Handle the form submission (you can save to DB, send email, etc.)
    // For now, we'll just send a success response
    res.status(200).json({ message: 'Message received successfully!' });
});

module.exports = router;
