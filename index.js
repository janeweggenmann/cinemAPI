const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;

const app = express();

mongoose.connect("mongodb://localhost:27017/cinemAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//use morgan to log data from all urls (middleware function)
app.use(morgan("common"));

//when accessing the body of a request, the data will be expected to be in JSON format
app.use(bodyParser.json());

app.use(express.static("public"));

//importing auth.js file
let auth = require("./auth")(app);

//import passport.js file and require Passport module
const passport = require("passport");
require("./passport");

//log all app-level errors to the console (middleware function)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

//homepage
app.get("/", (req, res) => {
  res.send("Welcome to my Cinema API!");
});

//MOVIES FUNCTIONS

//Return a list of ALL movies to the user
app.get("/movies", (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(200).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Return data about a single movie by title to the user
app.get("/movies/:Name", (req, res) => {
  Movies.findOne({ Name: req.params.Name })
    .then(movie => {
      res.status(200).json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Return data about a genre by name
app.get("/movies/genre/:Name", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Name })
    .then(movie => {
      res.status(200).json(movie.Genre);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Return data about a director by name
app.get("/movies/director/:Name", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(movie => {
      res.status(200).json(movie.Director);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Delete a movie by id
app.delete("/movies/:MovieID", (req, res) => {
  Movies.findOneAndRemove({ _id: req.params.MovieID })
    .then(movie => {
      if (!movie) {
        res.status(400).send(req.params.MovieID + " was not found");
      } else {
        res.status(200).send(req.params.MovieID + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Add a movie
app.post("/movies", (req, res) => {
  Movies.findOne({ Name: req.params.Name })
    .then(movie => {
      if (movie) {
        return res.status(400).send(req.params.Name + " already exists");
      } else {
        Movies.create({
          Name: req.body.Name,
          Year: req.body.Year,
          Description: req.body.Description,
          Genre: {
            Name: req.body.Genre.Name,
            Description: req.body.Genre.Description
          },
          Director: {
            Name: req.body.Director.Name,
            Bio: req.body.Director.Bio,
            Birth: req.body.Director.Birth,
            Death: req.body.Director.Death
          },
          ImageURL: req.body.ImageURL,
          Featured: req.body.featured
        })
          .then(movie => {
            res.status(201).json(movie);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//USER FUNCTIONS

//get all users
app.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Allow new users to register
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.params.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.send(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Allow a user to update their user info
/* We’ll expect JSON in this format:
{
  Username: String,(required)
  Password: String,(required)
  Email: String,(required)
  Birthday: Date
} */
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Allow users to add a movie to their list of favorites
app.post("/users/:Username/favorites/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Allow users to remove a movie from their list of favorites
app.delete("/users/:Username/favorites/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Allow existing users to deregister
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Listen for requests
app.listen(8080, () => {
  console.log("This app is listening on port 8080.");
});
