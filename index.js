const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");

const app = express();


//use morgan to log data from all urls (middleware function)
app.use(morgan("common"));

//when accessing the body of a request, the data will be expected to be in JSON format
app.use(bodyParser.json());

//log all app-level errors to the console (middleware function)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

app.get("/", (req, res) => {
  res.send("Welcome to my Cinema API!");
});

app.use(express.static("public"));

//return all movies
app.get("/movies", (req, res) => {
  res.json(movies);
  res.send("Successful GET request returning data on all movies");
});

//return all data of a single movie by name
app.get("/movies/:name", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.name === req.params.name;
    })
  );
  res.send("Successful GET request returning data about " + movie.name);
});

//return all genres
app.get("/genres", (req, res) => {
  res.json(genres);
  res.send("Successful GET request returning data on all genres");
});

//Return data about a genre by title
app.get("/genres/:title", (req, res) => {
  res.json(
    genres.find(genre => {
      return genre.title === req.params.title;
    })
  );
  res.send("Successful GET request returning data about " + genre.title);
});

//return all directors
app.get("/directors", (req, res) => {
  res.json(directors);
  res.send("Successful GET request returning data on all directors");
});

//Return data about a director by name
app.get("/directors/:name", (req, res) => {
  res.json(
    directors.find(director => {
      return director.name === req.params.name;
    })
  );
  res.send("Successful GET request returning data about " + director.name);
});

//Allow a new user to register
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing 'name' in request body";
    res.status(400).send(message);
  }
  if (!newUser.username) {
    const message = "Missing 'username' in request body";
    res.status(400).send(message);
  } else {
    users.push(newUser);
    res.status(201).send("Successful POST request to register a new user");
  }
});

//Allow a user to update their username
app.put("/users/:username", (req, res) => {
  res.send("Successful PUT request to update a user by username");
});

//Allow a user to add a movie to their list of favorites
app.post("/users/:username/favorites", (req, res) => {
  res.send(
    "Successful POST request to add a movie to a user's list of favorites"
  );
});

//Allow a user to remove a movie from their list of favorites
app.delete("/users/:username/favorites/:movie", (req, res) => {
  res.send(
    "Successful DELETE request to remove a movie from a user's list of favorites"
  );
});

// Deletes a user by username
app.delete("/users/:username", (req, res) => {
  res.send("Successful DELETE request to unregister a user.");
});

//listen for requests
app.listen(8080, () => {
  console.log("This app is listening on port 8080.");
});
