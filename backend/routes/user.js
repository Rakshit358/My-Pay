const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const signUpUser = z.object({
  username: z.string().email(),
  password: z.string().min(6, { message: "Must more than 6 characters" }),
  firstname: z.string().max(50, { message: "Must be less than 50 characters" }),
  lastname: z.string().max(50, { message: "Must be less than 50 characters" }),
});

const updateUser = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

router.post("/signup", async function (req, res) {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  console.log(req.body);
  // console.log(JWT_SECRET.JWT_SECRET);
  const check = signUpUser.safeParse(newUser);
  console.log("hii");
  if (!check.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  if (check.success == true) {
    const response = await User.find({ username: req.body.username });
    console.log(response);
    if (response.length != 0) {
      res.status(411).json({
        message: "User already exists",
      });
    } else {
      const user = await User.create(newUser);
      const userId = user._id;

      await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
      });

      const userToken = jwt.sign({ userId }, JWT_SECRET.JWT_SECRET);
      res.status(200).json({
        message: "Success",
        token: userToken,
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body.username);
  console.log(req.body.password);
  const user = await User.findOne({
    username: username,
    password: password,
  });

  if (!user) {
    return res.status(411).json({ message: "User not found" });
  }

  const userId = user._id;
  const userToken = jwt.sign({ userId }, JWT_SECRET.JWT_SECRET);
  res.status(200).json({
    token: userToken,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateUser.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating the fields",
    });
  }

  await User.findOneAndUpdate({ _id: req.userId }, req.body);
  res.json({ message: "Successfully updated" });
});

router.get("/bulk", async function (req, res) {
  const filter = req.query.filter || "";
  console.log("here");
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
