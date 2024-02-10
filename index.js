import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import colors from 'colors'
import userRoutes from "./routes/Users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import chatbotRoutes from "./routes/Chatbot.js";
import connectDB from './config/connectDB.js'
import otpRoutes from './routes/Otp.js'




const app = express();
dotenv.config();
connectDB();

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/chatbot", chatbotRoutes)
app.use('/otp', otpRoutes)

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send("This is a stack overflow clone's API by Adinath Raut")
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgBlue.white)
})


const DB_URL = process.env.CONNECTION_URL
mongoose.connect(DB_URL,{  useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>app.listen(PORT,()=>{console.log('server running on port ${PORT}')}))
.catch((err)=>console.log(err.message))