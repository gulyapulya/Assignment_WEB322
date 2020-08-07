const express = require('express')
const router = express.Router();

function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect("/Login");
    } 
    else {  
      next();
    }
}

function ensureClerk(req, res, next) {
    if (!req.session.user || !req.session.user.clerk) {
        res.redirect("/Login");
    } else {
        next();
    }
}

router.get("/Customer", ensureLogin, (req, res) => {
    res.render("dashboard/dashboard", {
        title: "Customer Dashboard Page",
        user: req.session.user
    });
});

router.get("/Clerk", ensureClerk, (req, res) => {
    res.render("dashboard/dashboard", {
        title: "Clerk Dashboard Page",
        user: req.session.user
    });
});

router.get("/Logout", function(req, res) {
    req.session.reset();
    res.redirect("/Login");
});

module.exports = router;