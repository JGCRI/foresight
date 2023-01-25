// load up our shiny new route for users
const exampleRoutes = require("./examples");

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get("/api", (req, res) => {
    res.send({ message: "Hello from server!" });
  });

  app.get("/api/check", (req, res) => {
    res.json({ message: "Hello from server check!" });
  });

  // run our user route module here to complete the wire up
  exampleRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;
