require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')}.`);
});
const environment = process.env.NODE_ENV || 'development';
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_NUM,
      to: req.body.to,
      body: req.body.body,
      mediaUrl: req.body.mediaUrl
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});