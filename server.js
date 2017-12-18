//express server for prod environment
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const VEHICLES_API = 'http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni';
let LOCAL_PORT = 3003;
let app = express();
app.use('/', express.static(path.resolve(__dirname, 'build')));
app.use('/sfmaps', express.static(path.resolve(__dirname, 'sfmaps')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/vehicles', (req, resp) => {
  fetch(VEHICLES_API)
	.then(res => res.json())
	.then(body => resp.send(body));
})


app.listen(process.env.PORT || LOCAL_PORT, (req, res) => {
    console.log(`server listening on port  ${process.env.PORT || LOCAL_PORT}`);
})
