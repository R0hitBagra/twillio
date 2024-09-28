const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  imap: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
  }
};

async function fetchUnreadEmails() {
  try {
    const connection = await imaps.connect({ imap: config.imap });
    await connection.openBox('INBOX');

    const searchCriteria = ['UNSEEN'];
    const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);
    const emails = [];

    for (const message of messages) {
      const headers = message.parts.find(part => part.which === 'HEADER').body;
      const { from, subject } = headers;
      emails.push({ from, subject });
    }

    connection.end();
    return emails;
  } catch (err) {
    console.error('Error fetching emails:', err);
  }
}

module.exports = fetchUnreadEmails;
