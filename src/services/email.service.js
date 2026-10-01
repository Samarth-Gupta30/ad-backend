const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    }
});

transporter.verify((error) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Backed Ledger" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to Backed Ledger!';
    const text = `Hi ${name},\n\nWelcome to Backed Ledger! We're excited to have you on board.\n\nBest regards,\nThe Backed Ledger Team`;
    const html = `
        <p>Hi ${name},</p>
        <p>Welcome to Backed Ledger! We're excited to have you on board.</p>
        <p>Best regards,<br>The Backed Ledger Team</p>
    `;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Confirmation - Backed Ledger';
    const text = `Hi ${name},\n\nYour transaction of ₹${amount} to account ${toAccount} has been completed successfully.\n\nBest regards,\nThe Backed Ledger Team`;
    const html = `
        <p>Hi ${name},</p>
        <p>Your transaction of <strong>₹${amount}</strong> to account <code>${toAccount}</code> has been completed successfully.</p>
        <p>Best regards,<br>The Backed Ledger Team</p>
    `;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendEmail, sendRegistrationEmail, sendTransactionEmail };