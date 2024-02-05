const argon2 = require("argon2");

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost:5,
    parallelism:1,
};
//argon2 package invoqué , argon2id = le type d'algo choisis

const hashPassword = (req, res, next) => {
    argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
        req.body.hashedPassword = hashedPassword;
        delete req.body.password;

        next();
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
};
    
//argon2.hash = hash est une méthode de l'objet argon2


module.exports = {
  hashPassword,
};