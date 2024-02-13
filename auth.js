const argon2 = require("argon2");
const jwt = require('jsonwebtoken');

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
        delete req.body.password;
        req.body.hashedPassword = hashedPassword;
        next();
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
};
    
//argon2.hash = hash est une méthode de l'objet argon2

// const verifyPassword = (req, res) => {
//   argon2
//     .verify(req.user.hashedPassword, req.body.password)
//     .then((isVerified) => {
//       if (isVerified) {
//         res.send("Credentials are valid");
//       } else {
//         res.sendStatus(401);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

 async function verifyPassword(req, res){
   console.log('req.body', req.body)
    try{
    const correct = await argon2.verify(req.user.hashedPassword, req.body.password);
     console.log('correct', correct)
      if (correct) {
        const payload = { sub: req.user.id };
        console.log('payload', payload);
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h", 
        })
        console.log('token', token)
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    }
    catch(err){
      console.error(err);
      res.sendStatus(500);
    };
};

async function verifyToken(req, res, next){
    try{
        const autorizationHeader = req.get("Authorization");
        if(autorizationHeader == null){
            throw new Error("Authorization header is missing");
        }
        const [type, token] = autorizationHeader.split(" ");

        if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (err){
        console.error(err);
        res.sendStatus(401);
    }
};

// async function verifyPassword(req, res){
//   try {
//     const correct = await argon2.verify(req.body.password, req.user.hashedPassword);
//     if (correct){
//         res.send('Credentials are valid');
//     } else {
//         res.sendStatus(401);
//     }
//   }
//   catch(err){
//     console.error(err);
//     res.sendStatus(500);
//   };
// }

// const verifyPassword = (req, res) => {
//   const correct = argon2.verify(req.body.password, req.user.hashedPassword);
//   res.send(req.body);
// }

// async function verifyPassword(req, res) {
//   await argon2
//     .verify(req.user.hashedPassword, req.body.password)
//     .try((isVerified) => {
//       if (isVerified) {
//         res.send("Credentials are valid");
//       } else {
//         res.sendStatus(401);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// async function  verifyPassword(req, res){
//     const { password } = req.body;

//     const correct = await argon2.verify(password, hashedPassword);
//     res.send
// }


module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};