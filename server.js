// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", (req, res) => {
  const isInvalidDate = new Date(req.params.date) === "Invalid Date" && 
  new Date(+req.params.date) === "Invalid Date"

  if (isInvalidDate) {
    res.json({ error : "Invalid Date" })
  } else {
    const utcData = new Date(req.params.date).toUTCString()
    const isNumberedDate = utcData === "Invalid Date"
    
    if (isNumberedDate) {
     res.json({ "unix": Date.parse(req.params.date), "utc": utcData })
    } else {
      res.json({ "unix": +req.params.date, "utc": new Date(+req.params.date).toUTCString() })
    }
  }
})

app.get("/api", (req, res) => {
  const utcData = new Date().toUTCString()

  res.json({ "unix": Date.parse(utcData), "utc": utcData })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
