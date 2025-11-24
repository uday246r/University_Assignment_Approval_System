import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getAdminDashboard = async(req: Request, res: Response) =>{
    try{
        const totalDepartments = await prisma.department.count();

        const totalStudents = await prisma.user.count({where: {role: "STUDENT"}});
        const totalProfessors = await prisma.user.count({where: {role: "PROFESSOR"}});
        const totalHods = await prisma.user.count({where: {role: "HOD"}});
        const totalUsers = totalStudents + totalProfessors + totalHods;

        return res.status(200).json({
            message: "Admin Dashboard Data",
            data:{
                totalDepartments,
                totalUsers,
                usersDetails: {
                    students: totalStudents,
                    professors: totalProfessors,
                    hods: totalHods,
                },
            },
        });
    } catch(err){
        console.log("Error fetching admin dashboard data", err);
        return res.status(500).json({message: "Server error"});
    }
}


