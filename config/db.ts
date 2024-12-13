import mongoose from "mongoose";

const url : string = "mongodb://0.0.0.0:27017/authDB"

export const db = () => {
   try{
    mongoose.connect(url).then(() => {
       console.log(`DB is connected to mongodb://0.0.0.0:27017`);
    })
   } catch(error){
       console.log(error);
   }
}
   
