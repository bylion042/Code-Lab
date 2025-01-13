const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Define the root route
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to My EJS Server' });
});

// Handle form submission
app.post('/send-message', async (req, res) => {
    const { fullname, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codelab042@gmail.com', // Replace with your email
            pass: 'wedu buod opfr euti', // Replace with your app password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'codelab042@gmail.com', // Your email address
        subject: `New Contact Form Submission from ${fullname}`,
        text: `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message Sent Successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Oops! Something went wrong, and we couldn\'t send your message.' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
