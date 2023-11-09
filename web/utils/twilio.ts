const accountSid = 'AC86a61e2646b04979fe45917798f0ec98';
const authToken = process.env.TWILIO_TOKEN
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Hello, this is your SMS message!',
    from: '+13345230641',
    to: '+2348064152319'
  })
  .then(message => console.log(`Message SID: ${message.sid}`))
  .catch(error => console.error(error));