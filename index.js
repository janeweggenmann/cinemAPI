const express = require("express"),
  morgan = require("morgan");

const app = express();

let topMovies = [
  {
    name: "The Shining",
    year: "1980"
  },
  {
    name: "The Sixth Sense",
    year: "1999"
  },
  {
    name: "Alien",
    year: "1979"
  },
  {
    name: "Raiders of the Lost Ark",
    year: "1981"
  },
  {
    name: "Singin' in the Rain",
    year: "1952"
  },
  {
    name: "Jaws",
    year: "1975"
  },
  {
    name: "Star Wars",
    year: "1977"
  },
  {
    name: "2001: A Space Odyssey",
    year: "1968"
  },
  {
    name: "Get Out",
    year: "2017"
  },
  {
    name: "The Truman Show",
    year: "1998"
  }
];

//use morgan to log data from all urls (middleware function)
app.use(morgan("common"));

//log all app-level errors to the console (middleware function)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

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
