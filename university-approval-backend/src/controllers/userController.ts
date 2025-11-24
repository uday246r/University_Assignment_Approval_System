import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { Prisma,  Role, AssignmentStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import "multer";
import { Express } from "express";


interface CreateUserBody {
  email: string,
  name: string;
  password: string;
  departmentId: string,
  role: Role;
}

export const createUser = async(req: Request<{}, {}, CreateUserBody>, res: Response) => {
        const { email, name, password, departmentId, role } = req.body;
try{
        const existingUser = await prisma.user.findUnique({ where: { email }});
        if(existingUser) return res.status(400).json({message : "User already exists"});
        
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                departmentId,
                role,
            },
        });
        res.status(201).json({newUser});
    } catch(err){
        console.log("Error while creating user", err);
        return res.status(500).json({message: "Server error"});
    }
}


export const findAllUser = async(req:Request, res:Response) =>{
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit= parseInt(req.query.limit as string) || 20;
        
        const search = (req.query.search as string) || "";
        const role = (req.query.role as string) || "";
        const departmentId = (req.query.department as string || "");

        const filtering: any  = {};

        if(search){
            filtering.name = { contains: search, mode: "insensitive" };
        }
        if(role){
            filtering.role = role;
        }
        if(departmentId){
            filtering.departmentId = departmentId;
        }


        const skip = (page-1)*limit;

        const [users, totalUsers] = await Promise.all([
            prisma.user.findMany({
                where: filtering,
                include: {
                    department: true,
                },
                skip,
                take: limit,
                orderBy: {createdAt: "desc"},
            }),
            prisma.user.count({where: filtering}),
        ]);

        const formattedUsers = users.map((u)=>({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            department: u.department ? u.department.name: null,
            departmentId: u.departmentId,
            createdAt: u.createdAt,
        }));

        res.status(200).json({
            message: "User fetched success",
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            departments: formattedUsers,
        })

    } catch(err){
        console.log("Error occur in view all Users ", err);
        return res.status(500).json({message: "Server error"});
    }
}

export const updateUser = async(req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const{ name, email, departmentId, password} = req.body;

        const user = await prisma.user.findUnique({ where: {id}});
        if(!user){
            return res.status(400).json({message: "User not exist"});
        }

        const existingUser = await prisma.user.findUnique({where: {email}});
        if(existingUser) return res.status(404).json({message: "Please enter your own valid details"});


        const updated = await prisma.user.update({
            where: {id},
            data: {
                name,
                email,
                departmentId,
                password
            },
        });

        res.status(200).json({
            message: "User updated successfully",
            user: updated,
        });
    } catch(err){
        console.log("Error while updating the user");
        res.status(500).json({message: "Server error"});
    }
};

export const deleteUser = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;

        const user = await prisma.user.findUnique({ where: {id} });
        if(!user){
        return res.status(404).json({ message: "User not found" });
        }

        await prisma.user.delete({where: {id}});

        return res.status(200).json({
            message: "User deleted successfully",
        })
    } catch(err){
        console.log("Error while deleting the user");
        res.status(500).json({message: "Server error"});
    }
};

export const studentDashboard = async(req: Request, res: Response) => {
    try{
        const assignments = await prisma.assignment.findMany();
        const totalAssignments = assignments.length;

        const grouped = await prisma.assignment.groupBy({
            by: ["status"],
            _count: { _all: true },
        });

        const statusCounts: Record<string, number> = {
            DRAFT: 0,
            SUBMITTED: 0,
            UNDER_REVIEW: 0,
            APPROVED_BY_PROFESSOR: 0,
            APPROVED_BY_HOD: 0,
            REJECTED: 0,
            RESUBMIT: 0,
        };

        grouped.forEach((g) => {
            statusCounts[g.status] = g._count._all;
        });

        const data = {
            assignments,
            totalAssignments,
            assignmentsStatusCount:{
            draftAssignments: statusCounts.DRAFT,
            submittedAssignments: statusCounts.SUBMITTED,
            approvedByProffAssignments: statusCounts.APPROVED_BY_PROFESSOR,
            approvedByHODAssignments: statusCounts.APPROVED_BY_HOD,
            rejectedAssignments: statusCounts.REJECTED,
            underReviewAssignments: statusCounts.UNDER_REVIEW,
            reSubmitAssignments: statusCounts.RESUBMIT,
            }
        };

        res.status(200).json({ message: "Student dashboard fetch successfully", data });
    } catch(err){
        console.log("Error occur in fetching student dashboard data");
        res.status(500).json({message: "Server error"});

    }
}


interface MulterRequest extends Request {
  file?: Express.Multer.File & { path?: string; };
  files?: Express.Multer.File[];
}

export const uploadAssignment = async (req: MulterRequest, res: Response) => {
  try {
    
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Please upload a valid PDF file." });
    }

    const fileUrl = req.file.path;    
    const { title, description, category, studentId } = req.body;

    
    if (!title || !studentId) {
      return res.status(400).json({
        message: "Title and studentId are required fields.",
      });
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description: description || null,
        category: typeof category === "string" ? category : null,
        studentId,
        fileUrl,
        status: AssignmentStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });

    return res.status(201).json({
      message: "Assignment uploaded successfully",
      assignment,
    });

  } catch (err) {
    console.log("Error in uploadAssignment:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const bulkUploadAssignment = async (req: MulterRequest, res: Response) => {
  try {
    
    const files = req.files as Express.Multer.File[];
    if (!files || files.length===0) {
      return res.status(400).json({ message: "Please upload at least one file (max 5)." });
    }

    const { title, description, category, studentId } = req.body;

    
    if (!title || !studentId) {
      return res.status(400).json({
        message: "Title and studentId are required fields.",
      });
    }

    const uploadedAssignments = [];

    for(const file of files){
    const assignment = await prisma.assignment.create({
      data: {
        title,
        description: description || null,
        category: typeof category === "string" ? category : null,
        studentId,
        fileUrl: file.path,
        status: AssignmentStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });

    uploadedAssignments.push(assignment);
    }
    return res.status(201).json({
      message: "Assignments uploaded successfully",
      count: uploadedAssignments.length,
      assignments: uploadedAssignments,
    });

  }catch (err) {
    console.log("Error in uploadAssignment:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
