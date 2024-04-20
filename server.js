
const app = require('./src/app');

const User = require("./src/models/userModel");
const Project = require("./src/models/projectModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}/api`);

    const bcrypt = require("bcryptjs");
    let admin = {
        email: "zackabess95@gmail.com",
        roles: "ROLE_ADMIN",
        password: bcrypt.hashSync("admin", 10),
        nom: "admin",
        prenom: "admin",
        adresse: "admin",
        ville: "admin",
        telephone: "admin",
        description: "admin",
        salaire: 0,
        isLocked: false
    }

    //create a default admin
    User.create(admin)
        .then((result) => {
            console.log("Default admin created");
        })
        .catch((err) => {
            console.log(err);
        });

});

server.on('error', console.error);
