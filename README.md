# Achievement 2 Project
Last Updated: June 20, 2021

## Welcome to CinemAPI
This is a REST API that provide users access to information about different movies, directors, and genres. Users can sign up, update their personal information, and create a list of their favorite movies. Please find endpoints in the table below.

| Business Logic                                            | URL                    | HTTP Method| Request                                      | Response                                                                                                |
|-------------------------------------------------------------|--------------------------|--------------|------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| Return a list of all movies                                 | /movies                  | GET          |                                                | Returns a list of all movies                                                                            |
| Return data about a single movie by name                    | /movies/[name]           | GET          |                                                | Returns data (name, year, description, genre, director, image URL, featured) of a single movie by name. |
| Return data about a genre by title                          | /genres/[title]          | GET          |                                                | Returns data (title and description) of a genre by title.                                               |
| Return data about a director by name                        | /directors/[name]        | GET          |                                                | Returns data (name, bio, birth year, death year) about a director by name.                              |
| Allow a new user to register                                | /users                   | POST         | Data (name, username, email) must be provided. | Returns a message stating the registration was successful.                                              |
| Allow a user to update their username                       | /users/[username]        | PUT          | Data (name and new username) must be provided. | Returns a message stating that the username has been successfully updated.                              |
| Allow a user to add a movie to their list of favorites      | /users/favorites         | POST         |                                                | Returns a message stating that the movie was successfully added to their list of favorites.             |
| Allow a user to remove a movie from their list of favorites | /users/favorites/[movie] | DELETE       |                                                | Returns a message stating that the movie was successfully removed from their list of favorites.         |
| Allow existing users to delete their account by username    | /users/username          | DELETE       |                                                | Returns a messaging stating that the user's account was successfully deleted.                           |
