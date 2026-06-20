const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  console.log('API route called');
  
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
    // Hardcoded credentials for Vercel deployment
    const EMAIL_USER = 'ryanroferos.work@gmail.com';
    const EMAIL_PASS = 'zrkx omps ukiv jnsn';
    
    console.log('Creating transporter with credentials');
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    console.log('Transporter created');

    // Email to portfolio owner
    const ownerMailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER,
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
      from: EMAIL_USER,
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
