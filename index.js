const express = require("express"),

const app = express();
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
