const express = require("express");
const exphbs = require('express-handlebars');

const meals = require("./models/meals");

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.get("/", (req, res) => {

    res.render("home", {
        title: "Home Page",
        data: meals.getFeatured()
    })

});

app.get("/MealsPackage", (req, res) => {

    res.render("meals", {
        title: "Meals Package Page",
        data: meals.getAll()
    })

});

app.get("/CustomerRegistration", (req, res) => {

    res.render("customer", {
        title: "Customer Registration Page"
    })

});

app.get("/Login", (req, res) => {

    res.render("login", {
        title: "Login Page"
    })

});

app.get("/Dashboard", (req, res) => {

    res.render("dashboard", {
        title: "Dashboard Page"
    })

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`The webserver is up and running`);

})