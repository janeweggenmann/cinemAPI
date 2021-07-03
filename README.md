# Achievement 2 Project
Last Updated: July 1, 2021

## Welcome to CinemAPI
This is a REST API that provide users access to information about different movies, directors, and genres. Users can sign up, update their personal information, and create a list of their favorite movies. Please find endpoints in the table below.

### Movie Endpoints
|Objective|HTTP Method|Endpoint|
|--- |--- |--- |
|Return a list of all movies in the database|GET|/movies|
|Return data on a single movie, by movie name|GET|/movies/[Name]|
|Return data on a single genre, by genre name|GET|/movies/genre/[Genre Name]|
|Return data on a single director, by name|GET|/movies/director/[Director Name]|

Example movie data returned: 
          
          { 
            "Name": "The Sixth Sense", 
            "Year": "1999", 
            "Description": "A boy who communicates with spirits seeks the help of a disheartened child psychologist.", 
            "Genre": { 
              "Name": "Thriller"
              "Description": "Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety."
            },
            "Director": { 
              "Name": "M. Night Shyamalan",
              "Bio": "M. Night Shyamalan is an American filmmaker, philanthropist, and actor.",
              "Birth": "1970"
            }, 
            "ImageURL": "https://upload.wikimedia.org/wikipedia/en/a/a4/The_Sixth_Sense_poster.png", 
            "Featured": true 
        }

### User Endpoints
|Objective|HTTP Method|URL|Request Body|Response|
|--- |--- |--- |--- |--- |
|Allow a new user to register for an account|POST|/users|User data must be provided in JSON format|Returns a message stating the user successfully registered|
|Allow a user to update their user information|PUT|/users/[Username]|User data must be provided in JSON format|Returns the updated user information in JSON format.|
|Allow a user to add a movie to their list of favorites|POST|/users/[Username]/favorites/[MovieID]||Returns the updated user information in JSON format with updated array of favorite movies.|
|Allow a user to remove a movie from their list of favorites|DELETE|/users/[Username]/favorites/[MovieID]||Returns the updated user information in JSON format with movie removed from array of favorite movies.|
|Allow existing users to delete their account by username|DELETE|/users/[Username]||Returns a messaging stating that the user's account was successfully deleted. If the user does not exist in the database, and error message is returned stating the user was not found.|

User data must be provided in the following JSON format:
          
          { 
          "Username": "[Username]", 
          "Password": "[Password]", 
          "Email": "[Email]", 
          "Birthday": "[YYYY-MM-DD]" 
        }
        
Example user data returned:
          
          { 
          "Username": "janeweggenmann", 
          "Password": "passw0rd!", 
          "Email": "janeweggenmann@gmail.com", 
          "Birthday": "1996-06-20", 
          "FavoriteMovies": 
            [ 
              "60dbc57c2126583711f84f7b", 
              "60dd2b57efba3a45116c9565" 
            ] 
          }
