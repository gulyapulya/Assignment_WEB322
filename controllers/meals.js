const express = require('express')
const router = express.Router();
const db = require("../models/db.js");


router.get("/", (req, res) => {
    db.getMeals(true).then((meals) => {
        res.render("meals/home", {
            title: "Home Page",
            data: meals
        });
    }).catch((err) => {
        console.log("Error while loading top meals: " + err);
    });
});

router.get("/MealsPackage", (req, res) => {
    db.getMeals(false).then((meals) => {
        res.render("meals/meals", {
            title: "Meals Page",
            data: meals
        });
    }).catch((err) => {
        console.log("Error while loading meals: " + err);
    });
});

module.exports = router;