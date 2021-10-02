var express = require("express");
var router = express.Router();

const credential = {
    email: "greatness4live@yahoo.com",
    password: "admin123"
}

//login user

router.post('/login', (req, res) => {
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful...!")
    }else{
        res.end("Invalid Email or Password")
    }
});

//Route for Dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorized User")
    }
});

//route for logout
router.get('/logout', (req, res)=> {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{title: "Express", logout: "logout Successfully...!"})
        }
    })
})
module.exports = router;