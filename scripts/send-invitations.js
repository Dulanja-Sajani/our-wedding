/**
 * Backend script to send invitations to all guests
 * Run with: node scripts/send-invitations.js
 * 
 * Before running, install dependencies:
 * npm install nodemailer twilio dotenv
 * 
 * Create a .env file with:
 * EMAIL_USER=your-email@gmail.com
 * EMAIL_PASSWORD=your-app-password
 * TWILIO_ACCOUNT_SID=your-twilio-sid
 * TWILIO_AUTH_TOKEN=your-twilio-token
 * TWILIO_PHONE_NUMBER=+1234567890
 * WEBSITE_URL=http://localhost:5173
 */

import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const guestsPath = path.resolve('./guests.json');
const guests = JSON.parse(fs.readFileSync(guestsPath, 'utf-8'));

// Email configuration
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// WhatsApp configuration (using Twilio)
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function generateToken(guestId, guestEmail) {
  const data = `${guestId}:${guestEmail}:${Date.now()}`;
  return Buffer.from(data).toString('base64').replace(/=/g, '');
}

function buildRsvpUrl(guestId, guestEmail, token) {
  const baseUrl = process.env.WEBSITE_URL || 'http://localhost:5173';
  return `${baseUrl}?guest=${token}`;
}

async function sendEmailInvitation(guest) {
  const token = generateToken(guest.id, guest.email);
  const rsvpUrl = buildRsvpUrl(guest.id, guest.email, token);

  const htmlContent = `
    <h2>You're Invited! 🎉</h2>
    <p>Dear ${guest.name},</p>
    <p>We're delighted to invite you to our wedding celebration!</p>
    <p>
      <strong>Please RSVP by clicking the link below:</strong><br>
      <a href="${rsvpUrl}" style="background-color: #e91e63; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        RSVP Now
      </a>
    </p>
    <p>Or copy this link: ${rsvpUrl}</p>
    <p>We can't wait to celebrate with you!</p>
  `;

  try {
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: guest.email,
      subject: "You're Invited to Our Wedding! 💍",
      html: htmlContent,
    });
    console.log(`✓ Email sent to ${guest.name} (${guest.email})`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to send email to ${guest.name}:`, error.message);
    return false;
  }
}

async function sendWhatsAppInvitation(guest) {
  const token = generateToken(guest.id, guest.email);
  const rsvpUrl = buildRsvpUrl(guest.id, guest.email, token);

  const message = `Hi ${guest.name}! 👋\n\nYou're invited to our wedding! 💍\n\nPlease RSVP by clicking here: ${rsvpUrl}\n\nWe can't wait to celebrate with you!`;

  try {
    await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${guest.phone}`,
      body: message,
    });
    console.log(`✓ WhatsApp sent to ${guest.name} (${guest.phone})`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to send WhatsApp to ${guest.name}:`, error.message);
    return false;
  }
}

async function sendAllInvitations(type = 'both') {
  console.log(`\n📧 Sending ${type} invitations to ${guests.length} guests...\n`);

  let emailCount = 0;
  let whatsappCount = 0;
  let failedCount = 0;

  for (const guest of guests) {
    if (type === 'email' || type === 'both') {
      const emailSuccess = await sendEmailInvitation(guest);
      if (emailSuccess) emailCount++;
      else failedCount++;
    }

    if (type === 'whatsapp' || type === 'both') {
      const whatsappSuccess = await sendWhatsAppInvitation(guest);
      if (whatsappSuccess) whatsappCount++;
      else failedCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✨ Invitation Summary:`);
  console.log(`  Emails sent: ${emailCount}`);
  console.log(`  WhatsApp sent: ${whatsappCount}`);
  console.log(`  Failed: ${failedCount}\n`);
}

// Run the script
const invitationType = process.argv[2] || 'both'; // both, email, or whatsapp
sendAllInvitations(invitationType).catch(console.error);
