# Constructor-Word-Guess

## What it is...

This is a CLI hangman game.  The game utlizes a call to the [TMDB API](https://developers.themoviedb.org/3/movies/get-popular-movies) at the popular movies endpoint (which returns an array of currently popular movie objects). From the array, movie titles, and plot summaries are pulled, and saved to an array. 

A random movie title is chosen from the array, and this is the word you need to guess. You have 12 guesses, and if you get it right, the plot summary for the movie is printed to the console as well. Spaces, and special characters are shown so that you don't have to guess them... 

## How to Play...

1. After forking this repo, cloning to your machine, and navigating to the root directory, you will need to create your own TMDB API Key and, create a dotenv (.env) file with the following code:

```
TMDB_KEY=<your key>
```
2. once you've done this, you need to run the following commands in terminal:

```
npm init -y
npm install
```
3. Now you are ready to play! type ``` node index.js ``` to your console and you will begin with a prompt:

![initial prompt](https://media.giphy.com/media/POHpUqZ9uGSf5sKAWP/giphy.gif) 

4. After you type ``` y ``` and hit enter, you're off to the races. 

## Screen Grab GIF showing game play... 

![GIF showing game play](https://media.giphy.com/media/3HDfX2T3t1neTyhSnG/giphy.gif)
