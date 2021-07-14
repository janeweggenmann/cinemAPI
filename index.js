const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models.js");
const { check, validationResult } = require("express-validator");

const Movies = Models.Movie;
const Users = Models.User;

const app = express();

const cors = require("cors");
//define which domains can access the API
let allowedOrigins = ["http://localhost:8080"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  })
);

//old connection to local host
/*
mongoose.connect("mongodb://localhost:27017/cinemAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
*/

//connect to heroku, uses key from heroku
mongoose.connect(process.env.CONNECTION_URI, {
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
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then(movies => {
        res.status(200).json(movies);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Return data about a single movie by title to the user
app.get(
  "/movies/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Name: req.params.Name })
      .then(movie => {
        res.status(200).json(movie);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Return data about a genre by name
app.get(
  "/movies/genre/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then(movie => {
        res.status(200).json(movie.Genre);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Return data about a director by name
app.get(
  "/movies/director/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then(movie => {
        res.status(200).json(movie.Director);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Delete a movie by id
app.delete(
  "/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// Add a movie
app.post(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

//USER FUNCTIONS

//get all users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//get a user by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Allow new users to register
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
}*/
app.post(
  "/users",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non-alphanumeric characters."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then(user => {
        if (user) {
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword, //hash password when registering before storing it in the MongoDB database
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
  }
);

//Allow a user to update their user info
/* We’ll expect JSON in this format:
{
  Username: String,(required)
  Password: String,(required)
  Email: String,(required)
  Birthday: Date
} */
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// Allow users to add a movie to their list of favorites
app.post(
  "/users/:Username/favorites/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// Allow users to remove a movie from their list of favorites
app.delete(
  "/users/:Username/favorites/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// Allow existing users to deregister
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
