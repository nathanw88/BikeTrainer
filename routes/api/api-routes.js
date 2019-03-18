var express = require("express");
var router = express.Router();
var axios = require("axios");
var bcrypt = require('bcrypt-nodejs');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());