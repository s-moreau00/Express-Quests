const express = require("express");
const { hashPassword, verifyPassword, verifyToken } = require("../auth");


const app = express();

app.use(express.json());
const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

// const isItDwight = (req, res) => {
//   if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
//     res.send("Credentials are valid");
//   } else {
//     res.sendStatus(401);
//   }
// };

app.post("/api/login", userControllers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

app.get("/", movieControllers.getApp);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);


app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", hashPassword, userControllers.postNewUser);


//app corespond à route.get("/path", middleware, controller.function)
app.use(verifyToken);

app.post("/api/movies", verifyToken, movieControllers.postMovie);
app.put("/api/movies/:id", movieControllers.updateMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

app.delete("/api/users/:id", userControllers.deleteUser);
app.put("/api/users/:id", hashPassword, userControllers.updateUser);

module.exports = app;
