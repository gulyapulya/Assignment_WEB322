const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const meals = require("./models/meals");

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {

    res.render("home", {
        title: "Home Page",
        data: meals.getFeatured()
    });

});

app.get("/MealsPackage", (req, res) => {

    res.render("meals", {
        title: "Meals Package Page",
        data: meals.getAll()
    });

});

app.get("/Dashboard", (req, res) => {

    res.render("dashboard", {
        title: "Dashboard Page"
    });

});

app.get("/CustomerRegistration", (req, res) => {

    res.render("customer", {
        title: "Customer Registration Page"
    });

});

app.get("/Login", (req, res) => {

    res.render("login", {
        title: "Login Page"
    });

});

app.post("/Login", (req, res) => {
    let uerror = "";
    let perror = ""; 
    let formD = {
        nameholder: req.body.uname,
        pswholder: req.body.psw
    };
    if(req.body.uname == ""){
        uerror = "This field is required";
    }
    if(req.body.psw == ""){
        perror = "This field is required";
    }
    if(req.body.uname == "" || req.body.psw == "") {
        console.log(formD);
        res.render("login", {
            title: "Login Page",
            usernameError: uerror,
            passwordError: perror,
            formD: formD
        });
    }
    else {
        res.redirect("/Dashboard");
    }

});


const PORT = 3000;

app.listen(PORT, () => {

    console.log(`The webserver is up and running`);

})