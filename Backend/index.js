import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./router/userroutes.js";
import companyRoute from "./router/companyroutes.js";
import jobRoute from "./router/jobroutes.js";
import applicationRoute from "./router/applicationroutes.js";
dotenv.config({})
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

// api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

const PORT = 8080
app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at port ${PORT} `)
})