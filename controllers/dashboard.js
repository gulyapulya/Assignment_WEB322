const express = require('express')
const router = express.Router();
const db = require("../models/db.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/img/",
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});
    
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      return cb(null, true);
    } else {
      return cb(new Error('Not an image! Please upload an image.', 400), false);
    }
};
    
const upload = multer({ storage: storage, fileFilter: imageFilter });
  
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
    res.render("dashboard/customer", {
        title: "Customer Dashboard Page",
        user: req.session.user
    });
});

router.get("/Clerk", ensureClerk, (req, res) => {
    res.render("dashboard/clerk", {
        title: "Clerk Dashboard Page",
        user: req.session.user
    });
});

router.get("/View", function(req, res) {
    db.getMeals(false).then((data)=>{
        res.render("dashboard/view", {
            title: "Clerk Dashboard Page",
            data: data,
            found: true,
            user: req.session.user
        });
    }).catch((err)=>{
        if(err == "No meals found") 
            res.render("dashboard/view", {
                title: "Clerk Dashboard Page",
                data: [],
                found: false,
                user: req.session.user
            });
        else
            console.log(err);
    });
});

router.get("/Add", function(req, res) {
    res.render("dashboard/add", {
        title: "Meal Add Page",
        succAdded: false,
        user: req.session.user
    });
});

router.post("/Add",upload.single("photo"),(req,res)=>{
    let formD = {
        titleholder: req.body.title,
        catholder: req.body.cat,
        priceholder: req.body.price,
        nmealsholder: req.body.nmeals,
        descholder: req.body.desc
    };
    try{
        req.body.img = req.file.filename;
    } catch(err) {
        res.render("dashboard/add", {
            title: "Meal Add Page",
            succAdded: false,
            imgError: "This field is required",
            formD: formD,
            user: req.session.user
        });
        return;
    }
    db.validateMealAdd(req.body).then((data)=>{
        db.addMeal(data).then((meal)=>{
            res.render("dashboard/add", {
                title: "Meal Add Page",
                succAdded: true,
                user: req.session.user
            });
        }).catch((err)=>{
            console.log("Error adding meal: " + err);
        });
    }).catch((data)=>{
        res.render("dashboard/add", {
            title: "Meal Add Page",
            succAdded: false,
            imgError: data.errors.img,
            titleError: data.errors.title,
            catError: data.errors.cat,
            priceError: data.errors.price,
            nmealsError: data.errors.nmeals,
            descError: data.errors.desc,
            formD: formD,
            user: req.session.user
        });
    });
});

router.get("/Edit", function(req, res) {
    res.render("dashboard/edit", {
        title: "Meal Edit Page",
        user: req.session.user
    });
});

router.post("/Edit", function(req, res) {
    db.getMealsByTitle(req.body.title).then((meals)=>{
        let formD = {
            titleholder: meals[0].title,
            catholder: meals[0].cat,
            priceholder: meals[0].price,
            nmealsholder: meals[0].nmeals,
            descholder: meals[0].desc
        };
        res.render("dashboard/editInfo", {
            title: "Meal Edit Page",
            formD: formD,
            succUpdated: false,
            user: req.session.user
        });
    }).catch((err)=>{
        if(err == "No meals found") 
            res.render("dashboard/edit", {
                title: "Meal Edit Page",
                titleholder: req.body.title,
                titleError: "There is no package with such title.",
                user: req.session.user
            });
        else
            console.log(err);
    });
});

router.post("/EditInfo", upload.single("photo"), (req,res)=>{
    let formD = {
        titleholder: req.body.title,
        catholder: req.body.cat,
        priceholder: req.body.price,
        nmealsholder: req.body.nmeals,
        descholder: req.body.desc
    };
    try{
        req.body.img = req.file.filename;
    } catch(err) {
        res.render("dashboard/editInfo", {
            title: "Meal Edit Page",
            imgError: "This field is required",
            formD: formD,
            succUpdated: false, 
            user: req.session.user
        });
        return;
    }
    db.validateMealEdit(req.body).then((data)=>{
        db.editMeal(data).then(()=>{
            res.render("dashboard/editInfo", {
                title: "Meal Edit Page",
                formD: formD,
                succUpdated: true,
                user: req.session.user
            });
        }).catch((err)=>{
            console.log("Error while editing a meal: " + err);
            res.render("dashboard/editInfo", {
                title: "Meal Edit Page",
                formD: formD,
                succUpdated: false,
                user: req.session.user
            });
        });
    }).catch((data)=>{
        res.render("dashboard/editInfo", {
            title: "Meal Edit Page",
            imgError: data.errors.img,
            catError: data.errors.cat,
            priceError: data.errors.price,
            nmealsError: data.errors.nmeals,
            descError: data.errors.desc,
            formD: formD,
            succUpdated: false, 
            user: req.session.user
        });
    });
});


router.get("/Logout", function(req, res) {
    req.session.reset();
    res.redirect("/Login");
});

module.exports = router;