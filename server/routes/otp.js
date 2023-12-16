import nodemailer from 'nodemailer';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gokhruutkarsh2122@ternaengg.ac.in',
    pass: '',
  },
});

const mailOptions = {
  from: 'gokhruutkarsh2122@ternaengg.ac.in',
  to: 'recipient-email@example.com',
  subject: 'Subject of the email',
  text: 'Body of the email',
  // You can use HTML instead of text if you want to send HTML emails
  // html: '<p>HTML content of the email</p>',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
