import { errorHandler } from "../utils/Error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/UserModel.js'


export const test = (req, res) => {
  res.json({ message: " controller is working" });
};

export const updateUser = async (req, res, next) => {
  //id of token and params doesn't match
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));

    //id of token and id from params match,then we proceed to update the user details
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(  req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({success:true,message:"Successfully updated",rest});
  } catch (error) {
    next(error);
  }
};

