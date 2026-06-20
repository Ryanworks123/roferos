const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  console.log('API route called');
  console.log('Environment variables:', {
    EMAIL_USER: process.env.EMAIL_USER ? 'set' : 'not set',
    EMAIL_PASS: process.env.EMAIL_PASS ? 'set' : 'not set'
  });
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;
  console.log('Request body:', { name, email, subject, message });

  // Validate input
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log('Transporter created');

    // Email to portfolio owner
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Confirmation email to sender
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Message Received - Ryan Roferos Portfolio',
      text: `
        Hi ${name},
        
        Thank you for reaching out! I have received your message and will get back to you as soon as possible.
        
        Your message:
        Subject: ${subject}
        ${message}
        
        Best regards,
        Ryan Roferos
      `,
      html: `
        <h3>Message Received</h3>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message}</p>
        <br>
        <p>Best regards,<br>Ryan Roferos</p>
      `
    };

    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(confirmationMailOptions);
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
