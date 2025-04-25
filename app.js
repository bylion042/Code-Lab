const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse JSON data
app.use(express.json());

// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Define the root route
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to My EJS Server' });
});

// Handle form submission (POST request)
app.post('/send-message', async (req, res) => {
    // Log the incoming request body to verify it's correct
    console.log('Received Data:', req.body); 

    const { fullname, email, message } = req.body; // Destructure the values

    // Check if any value is undefined
    if (!fullname || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields.',
        });
    }

    // Create the email transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codelab042@gmail.com',
            pass: 'wedu buod opfr euti', // Ensure you're using an app-specific password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'codelab042@gmail.com',
        subject: `New Contact Form Submission from ${fullname}`,
        text: `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Oops! Something went wrong, and we couldn\'t send your message.',
        });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
