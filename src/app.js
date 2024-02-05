const express = require("express");
const { hashPassword } = require("../auth");

const app = express();

app.use(express.json());
const movieControllers = require("./controllers/movieControllers");

app.get("/", movieControllers.getApp);
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", movieControllers.getUsers);
app.get("/api/users/:id", movieControllers.getUserById);
app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", hashPassword, movieControllers.postNewUser);
app.put("/api/movies/:id", movieControllers.updateMovie);
app.put("/api/users/:id", hashPassword, movieControllers.updateUser);
app.delete("/api/movies/:id", movieControllers.deleteMovie);
app.delete("/api/users/:id", movieControllers.deleteUser);
//app corespond à route.get("/path", middleware, controller.function)

module.exports = app;
