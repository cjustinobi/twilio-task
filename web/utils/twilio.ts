const accountSid = 'AC86a61e2646b04979fe45917798f0ec98';
const authToken = 'f5a47e6969520590b08a7f9e1fe0c823';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Hello, this is your SMS message!',
    from: '+13345230641',
    to: '+2348064152319'
  })
  .then(message => console.log(`Message SID: ${message.sid}`))
  .catch(error => console.error(error));