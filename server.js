/* 
github: https://github.com/gulyapulya/Assignment_WEB322
heroku: https://web322-assignment-gulnur.herokuapp.com

All the images were found either in google or in the sample website provided in the instructions

Hero img: https://www.freepik.com/free-photo/colorful-healthy-unhealthy-food-white-textured-background_2955602.htm
Others: Sample Website https://livefitfood.ca
*/

require('dotenv').config({path:"./config/keys.env"});
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require("./models/db.js");
const clientSessions = require("client-sessions");

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }))

app.use(clientSessions({
    cookieName: "session",
    secret: "web322_assignment_3", 
    duration: 20 * 60 * 1000, 
    activeDuration: 10 * 60 * 1000 
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
    app.listen(process.env.PORT || 3000);
})
.catch((data)=>{
  console.log(data);
});

