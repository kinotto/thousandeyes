//EXPRESS SERVER ONLY FOR PRODUCTION ENVIRONMENT
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
  //expose a backend API to fetch vehicles since heroku run in https and nextbus API is in http.
  //https://stackoverflow.com/questions/29112750/heroku-was-loaded-over-https-but-requested-an-insecure-xmlhttprequest-reques
  fetch(VEHICLES_API)
	.then(res => res.json())
	.then(body => resp.send(body));
})


app.listen(process.env.PORT || LOCAL_PORT, (req, res) => {
    console.log(`server listening on port  ${process.env.PORT || LOCAL_PORT}`);
})
