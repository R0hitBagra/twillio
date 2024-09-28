const fetchUnreadEmails = require('./fetchEmails');
const sendWhatsAppMessage = require('./sendWhatsAppMessage');

async function main() {
  // Fetch unread emails
  const unreadEmails = await fetchUnreadEmails();

  if (unreadEmails.length === 0) {
    console.log('No unread emails found');
    return;
  }

  // Format the message to send to WhatsApp
  const messageBody = unreadEmails
    .map(email => `From: ${email.from}\nSubject: ${email.subject}`)
    .join('\n\n');

  // Send message to WhatsApp
  await sendWhatsAppMessage(messageBody);
}

main().catch(console.error);
