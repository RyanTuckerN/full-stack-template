const { User } = require("../models");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const ERROR_MESSAGE = "SOMETHING WENT WRONG";
const SUCCESS_MESSAGE = "SUCCESS";

router.post("/signup", async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await User.create({
      passwordhash: bcrypt.hashSync(password, 13),
      email,
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.status(200).json({
      user,
      token,
      message: SUCCESS_MESSAGE,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: ERROR_MESSAGE });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      bcrypt.compare(password, user.passwordhash, (err, match) => {
        if (match) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400,
          });
          res.status(200).json({
            user,
            message: `🙂 User ${user.profile_name} logged in!!🙂`,
            sessionToken: token,
          });
        } else {
          res.status(502).send({ message: "🛑 Incorrect Password 🛑", err });
        }
      });
    } else {
      res.status(500).json({ message: "🤷 User does not exist 🤷 " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", err });
  }
});

module.exports = router;
