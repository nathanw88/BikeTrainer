var express = require("express");
var router = express.Router();
var axios = require("axios");
var bcrypt = require('bcrypt');
var user = require("../../models/users")

router.route("/login").post((req, res) => {
    user.selectWhere("userEmail", req.body.userEmail, function (result) {
        console.log(result)
        let password = req.body.userPassword;
        let userID
        let userEmail = req.body.userEmail
        for (var i = 0; i < result.length; i++) {
            if (result[i].userEmail == userEmail) {
                if (bcrypt.compareSync(password, result[i].userPassword)) {
                    userID = result[i].id;
                } else {
                    userEmail = -4;
                }
                break;
            }
        }

        if (userEmail && userID) {
            res.json({ userEmail, userID });
        } else if (userEmail === -4) {
            res.json({ error: "Incorrect Password" });
        } else {
            res.json({ error: "Email Does Not Exist" });
        }
    })
})
router.route("/register").post((req, res) => {
    user.selectWhere("userEmail", req.body.userEmail, function (result) {
        if (result == false) {
            bcrypt.hash(req.body.userPassword, 10).then(function (hash) {
                user.create(Object.keys(req.body), [req.body.userEmail, hash, req.body.userBirthday], function (response) {
                    res.json(response)
                })
            })
        }
        else{
            res.json({error: "Email already registered."})
        }
    })
})



module.exports = router;
