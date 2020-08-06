const express = require('express')
const router = express.Router();
const db = require("../models/db.js");

router.get("/", (req, res) => {

    res.render("registration/registration", {
        title: "Customer Registration Page"
    });

});

router.post("/", (req, res) => {
    let formD = {
        fnameholder: req.body.fname,
        lnameholder: req.body.lname,
        emailholder: req.body.email,
        pswholder: req.body.psw
    };
    db.validateUserRegistration(req.body).then((data)=>{
        db.addUser(data).then(()=>{
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
        }).catch((err)=>{
            console.log("Error registering user: " + err);
        });
      }).catch((data)=>{
        res.render("registration/registration", {
            title: "Customer Registration Page",
            fnameError: data.errors.fname,
            lnameError: data.errors.lname,
            emailError: data.errors.email,
            passwordError: data.errors.psw,
            formD: formD
        });
      });
});

module.exports = router;