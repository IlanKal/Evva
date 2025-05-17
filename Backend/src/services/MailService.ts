import nodemailer from 'nodemailer';
import { GuestAttributes } from '../models/Guest';
import { SupplierAttributes } from '../models/Supplier';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

class MailService {
  static async sendRsvpEmail(guest: GuestAttributes) {
    const { full_name, email, guest_id } = guest;
    const baseUrl = process.env.SERVER_BASE_URL;
    const yesLink = `${baseUrl}/rsvp/${guest_id}/yes`;
    const noLink = `${baseUrl}/rsvp/${guest_id}/no`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hello ${full_name},</h2>
        <p>You are invited to an event. Please confirm your attendance:</p>
        <div style="margin-top: 20px;">
          <a href="${yesLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">I will attend</a>
          &nbsp;&nbsp;
          <a href="${noLink}" style="padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 5px;">I won't attend</a>
        </div>
        <p style="margin-top: 40px; color: #888;">Thank you,</p>
        <p>Evva Events</p>
      </div>
    `;

    const mailOptions = {
      from: `"Evva Events" <evva6752@gmail.com>`,
      to: email,
      subject: 'Event RSVP Confirmation',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  }

  static async sendRatingEmail(guest: GuestAttributes, suppliers: SupplierAttributes[], eventId: number) {
    const { full_name, email, guest_id } = guest;
    const baseUrl = process.env.CLIENT_BASE_URL;
  
    const ratingPageUrl = `${baseUrl}/rate-page/guest/${guest_id}/${eventId}`;
  
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hello ${full_name},</h2>
        <p>Thank you for attending the event! Please click the button below to rate the suppliers:</p>
        <div style="margin-top: 20px;">
          <a href="${ratingPageUrl}" 
             style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
             Rate the Suppliers
          </a>
        </div>
        <p style="margin-top: 40px; color: #888;">Thank you,</p>
        <p>Evva Events</p>
      </div>
    `;
  
    const mailOptions = {
      from: `"Evva Events" <evva6752@gmail.com>`,
      to: email,
      subject: 'Rate your event experience!',
      html: htmlContent,
    };
  
    await transporter.sendMail(mailOptions);
  }
}

export default MailService;
