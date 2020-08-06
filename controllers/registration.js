const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {

    res.render("registration/registration", {
        title: "Customer Registration Page"
    });

});

router.post("/", (req, res) => {
    let ferror = "";
    let lerror = "";
    let eerror = "";
    let uerror = "";
    let perror = ""; 
    let check = true;
    let formD = {
        fnameholder: req.body.fname,
        lnameholder: req.body.lname,
        emailholder: req.body.email,
        nameholder: req.body.uname,
        pswholder: req.body.psw
    };
    if(req.body.fname == ""){
        ferror = "This field is required";
        check = false;
    }
    else {
        var letters = /^[A-Za-z]+$/;
        if(!req.body.fname.match(letters)){
            ferror = "This field should only include letters";
            check = false;
        }
    }
    if(req.body.lname == ""){
        lerror = "This field is required";
        check = false;
    }
    if(req.body.email == ""){
        eerror = "This field is required";
        check = false;
    }
    if(req.body.uname == ""){
        uerror = "This field is required";
        check = false;
    }
    if(req.body.psw == ""){
        perror = "This field is required";
        check = false;
    }
    else {
        var lnumlength = /^[a-z0-9]{6,12}$/i;
        if(!req.body.psw.match(lnumlength)){
            perror = "This field should only include letters or numbers and be from 6 to 12 characters long";
            check = false;
        }
    }
    if(!check) {
        res.render("registration/registration", {
            title: "Customer Registration Page",
            fnameError: ferror,
            lnameError: lerror,
            usernameError: uerror,
            passwordError: perror,
            emailError: eerror,
            formD: formD
        });
    }
    else {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: `${req.body.email}`,
            from: 'gulnurb2703@gmail.com',
            subject: 'Welcome!',
            text: 'We are happy to see you!',
            html: '<strong>We are happy to see you!</strong>',
        };
        sgMail.send(msg);
        res.redirect("/Dashboard");
    }

});

module.exports = router;