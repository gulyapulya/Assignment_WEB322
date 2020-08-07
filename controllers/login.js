const express = require('express')
const router = express.Router();
const db = require("../models/db.js");


router.get("/", (req, res) => {
    res.render("login/login", {
        title: "Login Page"
    });
});

router.post("/", (req, res) => {    
    let formD = {
        emailholder: req.body.email,
        pswholder: req.body.psw
    };

    db.validateUserLogin(req.body)
    .then((user)=>{
        req.session.user = user;
        if (user.clerk)
            res.redirect("/Dashboard/Clerk");
        else
            res.redirect("/Dashboard/Customer");
    })
    .catch((data)=>{
        res.render("login/login", {
            title: "Login Page",
            emailError: data.errors.email,
            passwordError: data.errors.psw,
            formD: formD
        });
    });
});

module.exports = router;

