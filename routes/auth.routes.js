const { Router } = require("express");
const { check } = require("express-validator");
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth.meddleware");
const router = Router();

router.post(
  "/register",
  [
    check(
      "name",
      "Длина имени должна быть не меньше 2 и не больше 15 символов"
    ).isLength({ min: 2, max: 15 }),
    check("email", "Некорректный email").isEmail(),
    check(
      "password",
      "Длина пароля должна быть не меньше 4 и не больше 12 символов"
    ).isLength({ min: 4, max: 12 }),
  ],
  AuthController.register
);

router.post("/login", AuthController.login);

router.get("/auth", authMiddleware, AuthController.auth);

module.exports = router;
