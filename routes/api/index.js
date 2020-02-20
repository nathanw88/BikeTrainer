const router = require("express").Router();
const userRoutes = require("./users");
const logRoutes = require("./log")
// const userLogsRoutes = require("./user-logs")

router.use("/users", userRoutes);
router.use("/log", logRoutes);
// router.use("user-logs", userLogsRoutes);

module.exports = router;
