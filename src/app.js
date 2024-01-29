const express = require("express");

const app = express();

const movieControllers = require("./controllers/movieControllers");

app.get("/", movieControllers.getApp);
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", movieControllers.getUsers);
app.get("/api/users/:id", movieControllers.getUserById);


module.exports = app;
