const express = require('express')
const router = express.Router();
const meals = require("../models/meals");

router.get("/", (req, res) => {

    res.render("meals/home", {
        title: "Home Page",
        data: meals.getFeatured()
    });

});

router.get("/MealsPackage", (req, res) => {

    res.render("meals/meals", {
        title: "Meals Package Page",
        data: meals.getAll()
    });

});

router.get("/Dashboard", (req, res) => {

    res.render("meals/dashboard", {
        title: "Dashboard Page"
    });

});

module.exports = router;