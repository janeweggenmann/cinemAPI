const mongoose = require("mongoose");

//hash users’ passwords and compare hashed passwords, secures login authentication process
const bcrypt = require("bcrypt");

let movieSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Year: Date,
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: Date,
    Death: Date
  },
  ImageURL: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

//hash a user's password when submitted
userSchema.statics.hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

//compared hashed password every time user logs in
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
