import { authModel } from '../Model/authModel';
import bcrypt from "bcryptjs"

export const signUp = async (req: any, res: any) => {
    try {        
        const { userName, email, password } = req.body ;

        const hashed = await bcrypt.hash(password , 10)
        const user = await authModel.create({ userName, email, password : hashed })

        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: userName, email, or password"
            });
        }
        

        return res.status(200).json(
            { success: true, message: "User created successfully", data: user }
        )
    } catch (error) {
        console.log(error);
    }
}


export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password"
            });
        }

        const emailCheck = await authModel.findOne({ email });
        console.log(emailCheck);
        

        if (!emailCheck) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isValid = await bcrypt.compare(password , emailCheck.password)

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        // if (emailCheck.password !== password) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Incorrect Password"
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: "Logged in user successfully",
            user: {
                email: emailCheck.email,
                id: emailCheck._id
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Error logging in user"
        });
    }
};


export const searchUser = async (req: any, res: any) => {
    try {
        const {userName} = req.query

        const user = await authModel.find({
            userName: { $regex: userName , $options: "i"}
        })

        return res.status(200).json({
            success: true,
            message: "User Search",
            data: user
        })

        // return res.status(200).json({
        //     success: true,
        //     message: "User Search",
        //     data: user
        // })
    } catch (error) {
        console.error("Error during search" , error);
        return res.status(500).json({
            success: false,
            message: "Error Searching User"
        })
    }
};


export const viewUsers = async (req:any,res:any) => {
    try {
        const users = await authModel.find()

        return res.status(200).json({
            success: true,
            message: "User view",
            data:users
        })
    } catch (error) {
        console.error("Error storing view" , error);
        return res.status(500).json({
            success: false,
            message: "Error Viewing User"
        })
    }
}

export const getOneUser = async (req:any,res:any) => {
    try {
        const {userid} = req.params;

        const user = await authModel.findById(userid)
        
        return res.status(200).json({
            message: "user found",
            data:user
        })
    } catch (error) {
        console.error("Error geting user",error);
        return res.status(500).json({
            success: false,
            message: "Error getting User"
        })
    }
}


export const updataUser = async (req:any,res:any) => {
    try {
        const {userid} = req.params;
        const {userName}= req.body

        const user = await authModel.findByIdAndUpdate(userid,{
            userName,
            new:true
        })

        return res.status(200).json({
            message:"user updata successful",
            data:user
        })
    } catch (error) {
        console.error("Error updating user",error);
        return res.status(500).json({
            success: false,
            message: "Error updating User"
        })
    }
}


export const deleteUser = async (req:any,res:any) => {
     try {
        const {userid} = req.params;

        const user = await authModel.findByIdAndDelete(userid)
    
        return res.status(200).json({
            message:"user updata successful",
            data:user
        })
     } catch (error) {
        console.error("Error updating user",error);
        return res.status(500).json({
            success: false,
            message: "Error updating User"
        })
     }
}