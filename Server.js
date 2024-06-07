const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// POST route to send email
app.post('/send-email', async (req, res) => {
    const { to, subject, text , pdfBase64} = req.body;

    // Log received data for debugging
    console.log('Received email data:', { to, subject, text });

    // Create a Nodemailer transporter using SMTP
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'saravanan23official@gmail.com',
            pass: 'wrnd qxez rvjf rxsx',
        },
    });

    // Decode the base64 PDF
    let pdfBuffer = Buffer.from(pdfBase64, 'base64');

    // Mail options
    let mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: 'application.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf',
            },
        ],
    };

    // Send email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
        res.status(200).send({ message: 'Email sent successfully', info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
