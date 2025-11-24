import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

export const login = async(req: Request,res: Response) => {
    try{
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({where : {email}});
        if(!user){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            {userId: user.id, role: user.role},
            process.env.JWT_SECRET as string,
            {expiresIn: "1d"}
        );

        return res.status(200).json({
            message: "Login successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch(err){
        console.log("Login error: ", err);
        return res.status(500).json({message: "Server error"});
    }
}