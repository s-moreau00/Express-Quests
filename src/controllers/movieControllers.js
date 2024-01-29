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

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database.query("INSERT INTO movies (title, director, year, color, duration) VALUES (?,?,?,?,?)", [title, director, year, color, duration])
  .then(([result]) => {
    res.status(201).send({id: result.insertId})
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500)
  })
};

const postNewUser = (req,res) => {
  const {firstname, lastname, email, city, language} = req.body;

  database.query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?,?,?,?,?)", [firstname, lastname, email, city, language])
  .then(([result]) => {
    res.status(201).send({id: result.insertId})
  })
  .catch((err) => {
    console.error(err);
    res.status(500)
  })
}

const updateMovie = (req,res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database.query("update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?", 
  [title, director, year, color, duration, id])
  .then(([result])=> {
  if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
  })
  .catch((err)=> {
    console.err(err);
    res.sendStatus(500)
  })
};

const updateUser = (req,res) => {
  const id = parseInt(req.params.id);
  const {firstname, lastname, email, city, language} = req.body;

database.query("update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?", [firstname, lastname, email, city, language, id])

.then(([result])=> {
  if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
  })
  .catch((err)=> {
    console.err(err);
    res.sendStatus(500)
  })
}
const deleteMovie = (req,res)=> {
  const id = parseInt(req.params.id)
database.query("delete from movies where id = ?", [id])
.then(([result])=> {
  if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
})
.catch((err)=> {
  console.error(err);
  res.sendStatus(500);
})
  
}
const deleteUser = (req,res)=> {
   const id = parseInt(req.params.id)
database.query("delete from users where id = ?", [id])
.then(([result])=> {
  if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
})
.catch((err)=> {
  console.error(err);
  res.sendStatus(500);
})
}
module.exports = {
  getMovies,
  getMovieById,
  getApp,
  getUsers,
  getUserById,
  postMovie,
  postNewUser,
  updateMovie,
  updateUser,
  deleteMovie,
  deleteUser,
};
