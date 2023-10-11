import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar:{
      type:String,
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw3ypUQG-GYXzPpb5IF33ep7&ust=1697141915574000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLCAv7ro7oEDFQAAAAAdAAAAABAE"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
