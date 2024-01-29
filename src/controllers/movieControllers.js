const movies = [ ];

const database = require("../../database")

const getApp =(req, res) => {
  res.status(200).send("hello :)");
}

const getMovies = (req, res) => {
  database
  .query("select * from movies")
  .then(([movies]) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
     res.sendStatus(500);
  });

  
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  
database
.query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUsers = ((req,res) => {
   database
  .query("select * from users")
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
     res.sendStatus(500);
  });
})

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  
database
.query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getMovies,
  getMovieById,
  getApp,
  getUsers,
  getUserById,
};
