const movies = [ ];

const database = require("../../database")

const getApp =(req, res) => {
  res.status(200).send("hello :)");
}

const getMovies = (req, res) => {
//   let sql ="select * from movies";
//   let sqlValues = [];

// if (req.query.color != null) {
//   sql += " where color = ?";
//   sqlValues.push(req.query.color);
// }
//   if(req.query.max_duration != null) {
//     sql += " and duration <= ?";
//     sqlValues.push(req.query.max_duration);
//   }
//   else if (req.query.max_duration != null) {
//   sql += " where duration <= ?";
//   sqlValues.push(req.query.max_duration);
// }
const initialSql = "select * from movies";
  const where = [];

  if (req.query.color != null) {
    where.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    });
  }
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
    });
  }

  database
  // .query(sql, sqlValues)
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
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

  //  database
  // .query("select * from users")
  // .then(([users]) => {
  //   res.json(users);
  // })
  // .catch((err) => {
  //   console.error(err);
  //    res.sendStatus(500);
  // });

  const initialSql = "select * from users";
  const where = [];

  if (req.query.language != null) {
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  }
  if (req.query.city != null) {
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    });
  }

  database
  // .query(sql, sqlValues)
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
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
