// controllers/contactController.js
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/emailService');
const { validateContactInput } = require('../utils/validation');

exports.submitContact = async (req, res, next) => {
  try {
    const { errors, isValid } = validateContactInput(req.body);
    
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const { name, email, subject, message } = req.body;
    
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    // Send email notification
    await sendContactEmail({ name, email, subject, message });

    res.status(201).json({
      success: true,
      data: newContact,
      message: 'Thank you for your message! I will get back to you soon.'
    });

  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    next(err);
  }
};