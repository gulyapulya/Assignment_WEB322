const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require("./models/db.js");
const clientSessions = require("client-sessions");

require('dotenv').config({path:"./config/keys.env"});

const PORT  = process.env.PORT ||  3000;

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(clientSessions({
    cookieName: "session",
    secret: "web322_assignment_3", 
    duration: 2 * 60 * 1000, 
    activeDuration: 1000 * 60 
  }));  

const mealsController = require("./controllers/meals");
const registrationController = require("./controllers/registration");
const loginController = require("./controllers/login");
const dashboardController = require("./controllers/dashboard");

app.use("/", mealsController);
app.use("/Registration", registrationController);
app.use("/Login", loginController);
app.use("/Dashboard", dashboardController);

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

