import mongoose from "mongoose";
const connectDB = async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to DB successfully")
   } catch(err){
    console.log("Error in connecting from Database in utils/DB.js")
   }
}
export default connectDB;