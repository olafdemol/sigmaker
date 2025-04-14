"use server";

import nodemailer from 'nodemailer';

export async function sendMail(to: string, subject: string, body: string): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // SMTP server from environment variable
        port: parseInt(process.env.SMTP_PORT || '587', 10), // SMTP port from environment variable
        secure: process.env.SMTP_SECURE === 'true', // Use true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // Email from environment variable
            pass: process.env.SMTP_PASS, // Email password from environment variable
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`, // Sender name and email from environment variables
        to,
        subject,
        html: body,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}