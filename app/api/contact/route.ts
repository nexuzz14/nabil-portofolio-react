import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const fonnteToken = process.env.FONNTE_TOKEN;
  const ownerPhone = process.env.OWNER_PHONE; // The admin's WhatsApp number

  // 1. Send WhatsApp Notification via Fonnte
  if (fonnteToken && ownerPhone) {
    try {
      // Notify Admin
      const adminMessage = `*Pesan Baru dari Portofolio!*\n\n*Nama:* ${name}\n*Email:* ${email}\n*WA:* ${phone || '-'}\n*Pesan:*\n${message}`;
      await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: { 'Authorization': fonnteToken },
        body: new URLSearchParams({ target: ownerPhone, message: adminMessage }),
      });

      // Auto-reply to Sender (if phone is provided)
      if (phone && phone.length >= 10) {
        const cleanSenderPhone = phone.replace(/[^0-9]/g, '');
        const autoReply = `Halo ${name},\n\nTerima kasih telah menghubungi saya melalui website portofolio.\n\nPesan Anda telah saya terima dan akan segera saya balas secepatnya.\n\nSalam,\n*Muhammad Nabil Cahya Firdaus*`;
        await fetch('https://api.fonnte.com/send', {
          method: 'POST',
          headers: { 'Authorization': fonnteToken },
          body: new URLSearchParams({ target: cleanSenderPhone, message: autoReply }),
        });
      }
    } catch (err) {
      console.error("Fonnte error:", err);
    }
  }

  // 2. Send Email Notification (Existing)
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Message from Contact Form`,
      html: `
        <h2>Pesan Baru dari Formulir Kontak Website</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${phone || '-'}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email error:", error);
    }
  }

  return NextResponse.json({ success: true, message: 'Message processed successfully!' }, { status: 200 });
}