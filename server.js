const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require("./models/db.js");

require('dotenv').config({path:"./config/keys.env"});

const PORT  = process.env.PORT ||  3000;

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))


const mealsController = require("./controllers/meals");
const registrationController = require("./controllers/registration");
const loginController = require("./controllers/login");

app.use("/", mealsController);
app.use("/Registration", registrationController);
app.use("/Login", loginController);

db.initialize()
.then(()=>{
    console.log("Data read successfully");
    app.listen(PORT, ()=>{
        console.log("Web Site is up and running");
    })
})
.catch((data)=>{
  console.log(data);
});

