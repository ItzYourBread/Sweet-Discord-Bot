const { inviteURL, supportServer } = require("./config.js")

var favicon = require('serve-favicon');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicons/favicon.ico'));

// Define pages
app.get("/", async (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html")
})

app.get("/shop", async (req, res) => {
  res.status(200).sendFile(__dirname + "/public/shop.html")
})

app.get("/404", async (req, res) => {
  res.status(200).sendFile(__dirname + "/public/404.html")
})

app.get("/tou", async (req, res) => {
  res.status(200).sendFile(__dirname + "/public/terms.html")
})

app.get("/termsofuse", async (req, res) => {
  res.status(200).sendFile(__dirname + "/public/terms.html")
})

app.get("/privacy", async (req, res) => {
  res.status(200).sendFile(__dirname + "/public/privacy.html")
})

app.get("/privacypolicy", async (req, res) => {
  res.status(200).sendFile(__dirname + "/public/privacy.html")
})

// Redirect links here
app.get(`/invite`, async (req, res) => {
  res.status(200)
  res.redirect(inviteURL)
})

app.get(`/join`, async (req, res) => {
  res.status(200)
  res.redirect(supportServer)
})

// Error 404 page here
app.use((req, res, next) => { 
  res.status(404).sendFile(__dirname + "/public/404.html")
}) 

app.listen(1032, () => console.log(`
Website is online
`));