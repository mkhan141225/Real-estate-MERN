import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/Error.js";

import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User is not registered"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //destructuring password so that we don't send them in token
    const {password:pass,...rest} = validUser._doc;

    res
    .cookie("access_token", token, { 
      httpOnly: true,
      // expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json(rest)
  } catch (error) {
    next(error);
  }
};
