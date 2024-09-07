import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Get the directory name from the URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (styles.css, script.js) from the root directory
app.use(express.static(__dirname)); // This will serve all static files from the same directory as server.js

// Serve index.html from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Ensure this serves index.html correctly
});

// POST route for form submission
app.post('/send-email', (req, res) => {
    const { first_name, last_name, e_mail, message } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: 'swdadfdsvfs@gmailo.com', // Your email address
            pass: 'sddcvdsvds' // Your email password (or use an App password if 2FA is enabled)
        }
    });

    // Email options
    let mailOptions = {
        from: e_mail, // Sender address
        to: 'dcdvfsb@gmail.com', // List of recipients
        subject: `Contact Form Submission from ${first_name}`, // Subject line
        text: `Name: ${first_name} ${last_name}\nEmail: ${e_mail}\nMessage:\n${message}` // Plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
