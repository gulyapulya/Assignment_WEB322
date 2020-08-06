const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var connectionString = "mongodb+srv://gulnur:SenecaPass@cpa-web322.4szmw.mongodb.net/Web322?retryWrites=true&w=majority";

let Schema = mongoose.Schema; 
let UserSchema = new Schema({
    fname: String,
    lname: String,
    email: {type: String, trim: true},
    psw: String,
    clerk: Boolean
});

let Users;

module.exports.initialize = function(){
    return new Promise((resolve, reject)=>{
        let db = mongoose.createConnection(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true });
        
        db.on('error', (err)=>{
            reject(err);
        });

        db.once('open', ()=>{
            Users = db.model("users", UserSchema);
            resolve();
        });
    });
}

module.exports.addUser = function(data){
    return new Promise((resolve,reject)=>{
        var newUser = new Users({
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            psw: data.psw,
            clerk: false
        }); 

        bcrypt.genSalt(10)  
        .then(salt => bcrypt.hash(newUser.psw, salt)) 
        .then(hash => { 
            newUser.psw = hash;

            newUser.save((err)=>{
                if (err){
                    console.log("Ahhh one more error: " + err);
                    reject(err);
                }
                else{
                    console.log("New User: " + data.email);
                    resolve();
                }
            });
        })
        .catch(err=>{
            console.log(err); 
            reject("Error while hashing the password");
        }); 
    });
}

module.exports.getUsersByEmail = function(inEmail){
    return new Promise((resolve,reject)=>{
        Users.find({email: inEmail}) 
        .exec() 
        .then((returnedUsers)=>{
            if(returnedUsers.length != 0)
                resolve(returnedUsers.map(item=>item.toObject()));
            else
                reject("No Users found");
        }).catch((err)=>{
                console.log("Error finding users by email:" + err);
                reject(err);
        });
    });
}

module.exports.validateUserRegistration = function(data) {
    return new Promise((resolve, reject) => {
        data.errors = {};
        check = true;
        if(data.fname == "") {
            data.errors.fname = "This field is required";
            check = false;
        }
        else {
            var letters = /^[A-Za-z]+$/;
            if(!data.fname.match(letters)){
                data.errors.fname = "This field should only include letters";
                check = false;
            }
        }
    
        if(data.lname == ""){
            data.errors.lname = "This field is required";
            check = false;
        }
    
        if(data.email == ""){
            data.errors.email = "This field is required";
            check = false;
        }
    
        if(data.psw == ""){
            data.errors.psw = "This field is required";
            check = false;
        }
        else {
            var lnumlength = /^[a-z0-9]{6,12}$/i;
            if(!data.psw.match(lnumlength)){
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
}
