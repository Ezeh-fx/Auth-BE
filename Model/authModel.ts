import mongoose, {model } from "mongoose";
import {iauth} from "../Utils/interfaces";

interface authData extends iauth , mongoose.Document {}

export const authSchema = new mongoose.Schema<authData>({
    userName : {
        type: String,
    },
    email : {
        type: String,
    },
    password: {
        type: String,
    },
    
});

export const authModel = model("auths", authSchema);