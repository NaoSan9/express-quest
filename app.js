require('dotenv').config()
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { validateMovie, validateUser } = require("./validators");
const { hashPassword, verifyPassword, verifyToken, userPermissionsById } = require("./auth");

// Public routes //

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", hashPassword, userHandlers.postUser);
app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

// Protected routes //

app.use(verifyToken);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.post("/api/users", validateUser, userHandlers.postUser);
app.put("/api/users/:id", validateUser, userPermissionsById, userHandlers.updateUser);
app.delete("/api/users/:id", userPermissionsById, userHandlers.deleteUser);
