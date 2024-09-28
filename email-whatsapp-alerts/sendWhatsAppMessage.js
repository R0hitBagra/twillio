const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

async function sendWhatsAppMessage(body) {
  try {
    await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.WHATSAPP_NUMBER,
      body
    });
    console.log('Message sent to WhatsApp');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

module.exports = sendWhatsAppMessage;
