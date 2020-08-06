const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {

    res.render("login/login", {
        title: "Login Page"
    });

});

router.post("/", (req, res) => {
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
        res.render("login/login", {
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

module.exports = router;