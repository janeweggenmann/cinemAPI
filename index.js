const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");

const app = express();

let movies = [
  {
    name: "The Sixth Sense",
    year: 1999,
    description:
      "Young Cole Sear (Haley Joel Osment) is haunted by a dark secret - he is visited by ghosts. Cole is frightened by visitations from those with unresolved problems who appear from the shadows. He is too afraid to tell anyone about his anguish, except child psychologist Dr. Malcolm Crowe (Bruce Willis). As Dr. Crowe tries to uncover the truth about Cole's supernatural abilities, the consequences for client and therapist are a jolt that awakens them both to something unexplainable.",
    genre: "Thriller",
    director: "M. Night Shyamalan",
    actors: {
      name: "Bruce Willis",
      name: "Haley Joel Osment",
      name: "Toni Collette"
    },
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/a/a4/The_Sixth_Sense_poster.png",
    featured: "yes"
  },
  {
    name: "The Shining",
    year: 1980,
    description:
      "Jack Torrance (Jack Nicholson) becomes winter caretaker at the isolated Overlook Hotel in Colorado, hoping to cure his writer's block. He settles in along with his wife, Wendy (Shelley Duvall), and his son, Danny (Danny Lloyd), who is plagued by psychic premonitions. As Jack's writing goes nowhere and Danny's visions become more disturbing, Jack discovers the hotel's dark secrets and begins to unravel into a homicidal maniac hell-bent on terrorizing his family.",
    genre: "Horror",
    director: "Stanley Kubrick",
    actors: {
      name: "Jack Nicholson",
      name: "Shelley Duvall",
      name: "Danny Lloyd"
    },
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg/220px-The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg",
    featured: "yes"
  },
  {
    name: "Spirited Away",
    year: 2001,
    description:
      "In this animated feature by noted Japanese director Hayao Miyazaki, 10-year-old Chihiro (Rumi Hiiragi) and her parents (Takashi Naitô, Yasuko Sawaguchi) stumble upon a seemingly abandoned amusement park. After her mother and father are turned into giant pigs, Chihiro meets the mysterious Haku (Miyu Irino), who explains that the park is a resort for supernatural beings who need a break from their time spent in the earthly realm, and that she must work there to free herself and her parents.",
    genre: "Animated",
    director: "Hayao Miyazaki",
    actors: {
      name: "Rumi Hiiragi",
      name: "Miyu Irino",
      name: "Mari Natsuki"
    },
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Spirited_Away_Japanese_poster.png/220px-Spirited_Away_Japanese_poster.png",
    featured: "yes"
  },
  {
    name: "Forrest Gump",
    year: 1994,
    description:
      "Slow-witted Forrest Gump (Tom Hanks) has never thought of himself as disadvantaged, and thanks to his supportive mother (Sally Field), he leads anything but a restricted life. Whether dominating on the gridiron as a college football star, fighting in Vietnam or captaining a shrimp boat, Forrest inspires people with his childlike optimism. But one person Forrest cares about most may be the most difficult to save -- his childhood love, the sweet but troubled Jenny (Robin Wright).",
    genre: "Drama",
    director: "Robert Zemeckis",
    actors: {
      name: "Tom Hanks",
      name: "Robin Wright"
    },
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Forrest_Gump_poster.jpg/220px-Forrest_Gump_poster.jpg",
    featured: "yes"
  },
  {
    name: "E.T. the Extra-Terrestrial",
    year: 1982,
    description:
      "After a gentle alien becomes stranded on Earth, the being is discovered and befriended by a young boy named Elliott (Henry Thomas). Bringing the extraterrestrial into his suburban California house, Elliott introduces E.T., as the alien is dubbed, to his brother and his little sister, Gertie (Drew Barrymore), and the children decide to keep its existence a secret. Soon, however, E.T. falls ill, resulting in government intervention and a dire situation for both Elliott and the alien.",
    genre: "Adventure",
    director: "Steven Spielberg",
    actors: {
      name: "Henry Thomas",
      name: "Drew Barrymore"
    },
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/E_t_the_extra_terrestrial_ver3.jpg/220px-E_t_the_extra_terrestrial_ver3.jpg",
    featured: "yes"
  }
];

let genres = [
  {
    title: "Thriller",
    description:
      "Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety."
  },
  {
    title: "Horror",
    description:
      "Horror is a genre of film and television whose purpose is to create feelings of fear, dread, disgust, and terror in the audience. The primary goal is to develop an atmosphere that puts the audience on edge and scares them."
  },
  {
    title: "Animated",
    description:
      "Animated is a genre in which the film's images are primarily created by computer or hand and the characters are voiced by actors. A skillful combination of caricature and artistry, animation amplifies reality, offering stories that are visually stylized, but emotionally truthful."
  },
  {
    title: "Drama",
    description:
      "The drama genre features stories with high stakes and a lot of conflicts. They're plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters."
  },
  {
    title: "Adventure",
    description:
      "Adventure films are a genre of film whose plots feature elements of travel. They typically involve protagonists who must leave their home or place of comfort and go to far away lands to fulfill a goal. Settings play an important role in adventure films, sometimes as big as the characters themselves."
  }
];

let directors = [
  {
    name: "M. Night Shyamalan",
    bio:
      "M. Night Shyamalan is an American filmmaker, philanthropist, and actor. He is known for making original films with contemporary supernatural plots and twist endings. He was born in Mahé, India, and raised in Penn Valley, Pennsylvania.",
    birthyear: 1970,
    deathyear: ""
  },
  {
    name: "Stanley Kubrick",
    bio:
      "Stanley Kubrick was an American film director, producer, screenwriter, and photographer. He is frequently cited as one of the greatest filmmakers in cinematic history. His films, which are mostly adaptations of novels or short stories, cover a wide range of genres, and are noted for their realism, dark humor, unique cinematography, extensive set designs, and evocative use of music.",
    birthyear: 1928,
    deathyear: 1999
  },
  {
    name: "Hayao Miyazaki",
    bio:
      "Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, a film and animation studio, he has attained international acclaim as a masterful storyteller and as a maker of animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
    birthyear: 1941,
    deathyear: ""
  },
  {
    name: "Robert Zemeckis",
    bio:
      "Robert Lee Zemeckis is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects. He first came to public attention in the 1980s, but later diversified into more dramatic fare, including 1994's Forrest Gump, for which he won an Academy Award for Best Director; the film itself won Best Picture. The films he has directed have ranged across a wide variety of genres, for both adults and families.",
    birthyear: 1951,
    deathyear: ""
  },
  {
    name: "Steven Spielberg",
    bio:
      "Steven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is one of the most commercially successful directors in history. Spielberg is the recipient of various accolades, including two Academy Awards for Best Director, a Kennedy Center honor, and a Cecil B. DeMille Award.",
    birthyear: 1946,
    deathyear: ""
  }
];

//use morgan to log data from all urls (middleware function)
app.use(morgan("common"));

//when accessing the body of a request, the data will be expected to be in JSON format
app.use(bodyParser.json());

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

});

//listen for requests
app.listen(8080, () => {
  console.log("This app is listening on port 8080.");
});
