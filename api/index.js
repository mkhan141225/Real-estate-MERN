import express from "express";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
 import userRouter from "./routes/UserRoutes.js";
import authRouter from "./routes/AuthRoute.js"
import cookieParser from 'cookie-parser'
import listingRoute from './routes/ListingRoute.js'
dotenv.config();
const app = express();



const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

app.use(cookieParser())
app.use(express.json())


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongoDB".bgMagenta.white);
  })
  .catch((error) => {
    console.log(error);
  });





app.get("/", (req, res) => {
  res.json({ message: "<h1>welcome</h1>" });
});
app.listen(3000, () => {
  console.log("server is running on port 3000".bgYellow.white);
});

 app.use("/api/user", userRouter);
 app.use("/api/auth", authRouter);
  app.use("/api/listing",listingRoute)


 //middleware for catching error
 app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({success:false,statusCode,message})
 })

