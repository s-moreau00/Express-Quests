const database = require("../../database")
const express = require("express");

const app = express();
app.use(express.json());

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

  const initialSql = "select firstname, lastname, email, city, language from users";
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
});

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  
database
.query("select firstname, lastname, email, city, language from users where id = ?", [id])
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

const postNewUser = (req,res) => {
  const {firstname, lastname, email, city, language, hashedPassword} = req.body;

  database.query("INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?,?,?,?,?,?)", [firstname, lastname, email, city, language, hashedPassword])
  .then(([result]) => {
    res.status(201).send({id: result.insertId})
  })
  .catch((err) => {
    console.error(err);
    res.status(500)
  })
};

const updateUser = (req,res) => {
  const id = parseInt(req.params.id);
  const {firstname, lastname, email, city, language, hashedPassword} = req.body;

database.query("update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ?, where id = ?", [firstname, lastname, email, city, language,hashedPassword, id])

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
};

module.exports = {
  getUsers,
  getUserById,
  postNewUser,
  updateUser,
  deleteUser,
};

