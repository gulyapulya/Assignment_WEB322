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

module.exports = router;