const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const fakeDB = require("./meals.js");
var connectionString = "mongodb+srv://gulnur:SenecaPass@cpa-web322.4szmw.mongodb.net/Web322?retryWrites=true&w=majority";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    fname: String,
    lname: String,
    email: { type: String, trim: true, unique: true},
    psw: String,
    clerk: { type: Boolean, default: false }
});

let MealsSchema = new Schema({
    img: String,
    title: {type: String, unique: true},
    category: String,
    price: String,
    nmeals: Number,
    description: String,
    top: Boolean
});

let Users;
let Meals;

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

        db.on('error', (err) => {
            reject(err);
        });

        db.once('open', () => {
            Meals = db.model("meals", MealsSchema);
            Users = db.model("users", UserSchema);/*
            fakeDB.getAll().foreach((item) => {
                console.log(item);
                var newMeal = new Meals(item);
                newMeal.save((err) => {
                    if (err) {
                        console.log("Ahhh one more error: " + err);
                        reject(err);
                    }
                    else {
                        console.log("New Meal: " + item.title);
                        resolve();
                    }
                });
            });*/
            resolve();
        });
    });
}

module.exports.getMeals = function (top) {
    return new Promise((resolve, reject) => {

        if (top)
            LookingForMeals = Meals.find({ top: true });
        else
            LookingForMeals = Meals.find();

        LookingForMeals
            .exec()
            .then((returnedMeals) => {
                if (returnedMeals.length != 0)
                    resolve(returnedMeals.map(item => item.toObject()));
                else
                    reject("No meals found");
            })
            .catch((err) => {
                reject(err);
            });
    });
};


module.exports.addUser = function (data) {
    return new Promise((resolve, reject) => {
        var newUser = new Users({
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            psw: data.psw,
            clerk: data.clerk,
        });

        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(newUser.psw, salt))
            .then(hash => {
                newUser.psw = hash;
                newUser.save((err) => {
                    if (err) {
                        console.log("Ahhh one more error: " + err);
                        reject(err);
                    }
                    else {
                        console.log("New User: " + data.email);
                        resolve(newUser);
                    }
                });
            })
            .catch(err => {
                console.log(err);
                reject("Error while hashing the password");
            });
    });
}

module.exports.getUsersByEmail = function (inEmail) {
    return new Promise((resolve, reject) => {
        Users.find({ email: inEmail })
            .exec()
            .then((returnedUsers) => {
                if (returnedUsers.length != 0)
                    resolve(returnedUsers.map(item => item.toObject()));
                else
                    reject("No Users found");
            }).catch((err) => {
                console.log("Error finding users by email:" + err);
                reject(err);
            });
    });
}

module.exports.validateUserRegistration = function (data) {
    return new Promise((resolve, reject) => {
        data.errors = {};
        let check = true;

        data.clerk = (data.clerk)? true: false;
        
        if (data.fname == "") {
            data.errors.fname = "This field is required";
            check = false;
        }
        else {
            var letters = /^[A-Za-z]+$/;
            if (!data.fname.match(letters)) {
                data.errors.fname = "This field should only include letters";
                check = false;
            }
        }

        if (data.lname == "") {
            data.errors.lname = "This field is required";
            check = false;
        }

        if (data.email == "") {
            data.errors.email = "This field is required";
            check = false;
        }

        if (data.psw == "") {
            data.errors.psw = "This field is required";
            check = false;
        }
        else {
            var lnumlength = /^[a-z0-9]{6,12}$/i;
            if (!data.psw.match(lnumlength)) {
                data.errors.psw = "This field should only include letters or numbers and be from 6 to 12 characters long";
                check = false;
            }
        }

        if (!check) {
            reject(data);
        } else {
            this.getUsersByEmail(data.email)
                .then((user) => {
                    data.errors.email = "This email is already registered";
                    reject(data);
                })
                .catch(() => {
                    resolve(data);
                });
        }
    });
};

module.exports.validateUserLogin = function(data) {
    return new Promise((resolve, reject) => {
        data.errors = {};

        if(data.email == "")
            data.errors.email = "This field is required";
        if(data.psw == "")
            data.errors.psw = "This field is required";

        if(data.email == "" || data.psw == "") 
            reject(data);

        this.getUsersByEmail(data.email)
        .then((user) => {
            bcrypt
            .compare(data.psw, user[0].psw)
            .then((res) => {
                if (res) {
                    resolve(user[0]);
                } else {
                    data.errors.psw = "Wrong password or email!";
                    reject(data);
                }
            })
            .catch((err) => {
                console.log("Comparing passwords error: " + err);
                reject(data);
            });
        })
        .catch((err) => {
            console.log("Getting user by email error: " + err);
            reject(data);
        });
    });
};
  