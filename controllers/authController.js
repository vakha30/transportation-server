const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const userModel = require("../models/User");

const pool = require("../config/db");

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect reques", errors });
      }

      const { name, email, password } = req.body;

      const candidatePromise = userModel.getByEmail(email);
      const candidate = await candidatePromise;

      if (candidate[0]) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже сушествует" });
      }

      const hashPassword = await bcrypt.hashSync(password, 8);

      userModel.addNewUser(name, email, hashPassword).then((data) => {
        return res.json({ message: "Пользователь добавлен", data });
      });
    } catch (error) {
      console.log(error);
      res.send("Server error");
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const response = userModel.getByEmail(email);

      const user = await response;

      if (!user[0]) {
        return res.status(401).json({ message: "Пользователь не найден" });
      }

      const validPassword = await bcrypt.compareSync(
        password,
        user[0].password
      );

      if (!validPassword) {
        return res.status(400).json({ message: "неверный пароль" });
      }

      const token = jwt.sign({ id: user[0].ID }, config.get("secretKey"), {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user: {
          name: user[0].name,
          email: user[0].email,
        },
      });
    } catch (e) {
      console.log(e);
      res.send("Server error!");
    }
  }

  async auth(req, res) {
    try {
      const userPromise = userModel.getById(req.user.id);

      const user = await userPromise;

      const token = jwt.sign({ id: user[0].ID }, config.get("secretKey"), {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user: {
          name: user[0].name,
          email: user[0].email,
        },
      });
    } catch (e) {
      console.log(e);
      res.send("Server error!");
    }
  }
}

module.exports = new AuthController();
