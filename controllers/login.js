const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {

    res.render("login/login", {
        title: "Login Page"
    });

});

router.post("/", (req, res) => {
    let eerror = "";
    let perror = ""; 
    let formD = {
        emailholder: req.body.email,
        pswholder: req.body.psw
    };
    if(req.body.email == ""){
        uerror = "This field is required";
    }
    if(req.body.psw == ""){
        perror = "This field is required";
    }
    if(req.body.email == "" || req.body.psw == "") {
        console.log(formD);
        res.render("login/login", {
            title: "Login Page",
            emailError: eerror,
            passwordError: perror,
            formD: formD
        });
    }
    else {
        res.redirect("/Dashboard");
    }
});

module.exports = router;