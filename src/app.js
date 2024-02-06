const express = require("express");
const { hashPassword } = require("../auth");

const app = express();

app.use(express.json());
const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

app.get("/", movieControllers.getApp);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);
app.put("/api/movies/:id", movieControllers.updateMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", hashPassword, userControllers.postNewUser);
app.put("/api/users/:id", hashPassword, userControllers.updateUser);
app.delete("/api/users/:id", userControllers.deleteUser);

//app corespond à route.get("/path", middleware, controller.function)

module.exports = app;
