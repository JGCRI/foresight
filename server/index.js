const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Trying routes here
// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
