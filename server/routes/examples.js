const userRoutes = (app, fs) => {
  const path = require("path");

  // Example users
  // variables
  const exampleDataUsers = path.resolve(
    __dirname,
    "../data/example_data_users.json"
  );
  // READ
  app.get("/api/users", (req, res) => {
    fs.readFile(exampleDataUsers, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });

  //...........................
  // Example Bar Data
  //..........................
  // variables
  const exampleBarData1 = path.resolve(
    __dirname,
    "../data/example_bar_data1.json"
  );
  // READ
  app.get("/api/exampleBarData1", (req, res) => {
    fs.readFile(exampleBarData1, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });

  // variables
  const exampleBarData2 = path.resolve(
    __dirname,
    "../data/example_bar_data2.json"
  );
  // READ
  app.get("/api/exampleBarData2", (req, res) => {
    fs.readFile(exampleBarData2, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });

  //...........................
  // Example Area Bump Data
  //..........................

  // variables
  const exampleAreaBumpData1 = path.resolve(
    __dirname,
    "../data/example_areabump_data1.json"
  );
  // READ
  app.get("/api/exampleAreaBumpData1", (req, res) => {
    fs.readFile(exampleAreaBumpData1, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = userRoutes;
