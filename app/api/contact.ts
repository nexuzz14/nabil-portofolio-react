import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = request.body;

  if (!name || !email || !message) {
    return response.status(400).json({ message: 'Missing required fields' });
  }

  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,    
      pass: process.env.EMAIL_PASS,    
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'mnabilcf14@gmail.com', 
    subject: `New Message from Contact Form`,
    html: `
      <h2>Pesan Baru dari Formulir Kontak</h2>
      <p><strong>Nama:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Pesan:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return response.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ success: false, message: 'Failed to send email.' });
  }
}