const express = require("express"),
  morgan = require("morgan");

const app = express();
//use morgan to log data from all urls (middleware function)
app.use(morgan("common"));

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Cinema API!");
});

app.use(express.static("public"));

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

//listen for requests
app.listen(8080, () => {
  console.log("This app is listening on port 8080.");
});
