const router = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const {authMiddleWare} = require("../middleware/auth.middleware.js")

router.get("/me",authMiddleWare, authController.verifyToken);
router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
