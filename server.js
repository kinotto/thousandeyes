//express server for prod environment
const express = require('express');
const path = require('path');

let LOCAL_PORT = 3003;
let app = express();
app.use('/', express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || LOCAL_PORT, (req, res) => {
    console.log(`server listening on port  ${process.env.PORT || LOCAL_PORT}`);
})
