# Achievement 2 Project
Last Updated: July 1, 2021

## Welcome to CinemAPI
This is a REST API that provide users access to information about different movies, directors, and genres. Users can sign up, update their personal information, and create a list of their favorite movies. Please find endpoints in the table below.

|Business Logic|URL|HTTP Method|Request|Response|
|--- |--- |--- |--- |--- |
|Return a list of all movies|/movies|GET||Returns a list of all movies|
|Return data about a single movie by name|/movies/[Name]|GET||Returns data (name, year, description, genre, director, image URL, featured) of a single movie by name.|
|Return data about a genre by title|/movies/genre/[Genre Name]|GET||Returns data of a genre by name.|
|Return data about a director by name|/movies/director/[Director Name]|GET||Returns data (name, bio, birth year, death year) about a director by name.|
|Allow a new user to register|/users|POST|Data must be provided in the following JSON format: { Username: [Username], Password: [Password], Email: [Email], Birthday: [YYYY-MM-DD] } |Returns a message stating the registration was successful.|
|Allow a user to update their information|/users/[Username]|PUT|Data must be provided in the following JSON format: { Username: [Username], Password: [Password], Email: [Email], Birthday: [YYYY-MM-DD] } |Returns a message stating that the user profile has been successfully updated.|
|Allow a user to add a movie to their list of favorites|/users/[Username]/favorites/[MovieID]|POST||Returns a message stating that the movie was successfully added to their list of favorites.|
|Allow a user to remove a movie from their list of favorites|/users/[Username]/favorites/[MovieID]|DELETE||Returns a message stating that the movie was successfully removed from their list of favorites.|
|Allow existing users to delete their account by username|/users/[Username]|DELETE||Returns a messaging stating that the user's account was successfully deleted.|
