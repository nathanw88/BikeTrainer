const router = require("express").Router();
const userRoutes = require("./users");
const logRoutes = require("./log")

router.use("/users", userRoutes);
router.use("/log", logRoutes)

module.exports = router;
