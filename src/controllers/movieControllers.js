const movies = [ ];
const database = require("../../database")
const express = require("express");

const app = express();
app.use(express.json());

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

module.exports = {
  getApp,
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovie,
};
