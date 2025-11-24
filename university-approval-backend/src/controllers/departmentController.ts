import { Request, Response } from "express";
import prisma from "../utils/prisma";

interface CreateDepartmentBody {
  name: string;
  program: string;
  code: string;
  description?: string; 
}

export const createDepartment = async(req: Request<{}, {}, CreateDepartmentBody>, res: Response) => {
        const { name, program, code, description } = req.body;
try{
        const existingdept = await prisma.department.findFirst({
        where: { 
            OR: [
                {name},
                {code}
            ]
         }
        });
        if(existingdept) return res.status(400).json({message : "Department already exists"});

        const newDept = await prisma.department.create({
            data: {
                name,
                program,
                code,
                description,
            },
        });
        res.status(201).json({newDept});
    } catch(err){
        console.log("Error while creating admin", err);
        return res.status(500).json({message: "Server error"});
    }
}


export const findAllDepartment = async(req:Request, res:Response) =>{
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit= parseInt(req.query.limit as string) || 10;
        const search = (req.query.search as string) || "";
        const type = (req.query.type as string) || "";

        const filtering: any  = {};

        if(search){
            filtering.name = { contains: search, mode: "insensitive" };
        }
        if(type){
            filtering.program = type;
        }

        const skip = (page-1)*limit;

        const [departments, totalDepartments] = await Promise.all([
            prisma.department.findMany({
                where: filtering,
                include: {
                    users: true,
                },
                skip,
                take: limit,
                orderBy: {createdAt: "desc"},
            }),
            prisma.department.count({where: filtering}),
        ]);

        const formattedDepartments = departments.map((dept)=>({
            id: dept.id,
            name: dept.name,
            program: dept.program,
            description: dept.description,
            totalUsers: dept.users.length,
            createdAt: dept.createdAt,
        }));

        res.status(200).json({
            message: "Departments fetched success",
            currentPage: page,
            totalPages: Math.ceil(totalDepartments / limit),
            totalDepartments,
            departments: formattedDepartments,
        })

    } catch(err){
        console.log("Error occur in view all department ", err);
        return res.status(500).json({message: "Server error"});
    }
}

export const updateDepartment = async(req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const{ name, program, description} = req.body;

        const dept = await prisma.department.findUnique({ where: {id}});
        if(!dept){
            return res.status(400).json({message: "Dept not exist"});
        }

        const updated = await prisma.department.update({
            where: {id},
            data: {
                name,
                program,
                description,
            },
        });

        res.status(200).json({
            message: "Department updated successfully",
            department: updated,
        });
    } catch(err){
        console.log("Error while updating the department");
        res.status(500).json({message: "Server error"});
    }
};

export const deleteDepartment = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;

        const dept = await prisma.department.findUnique({where: {id} });
        if(!dept){
      return res.status(404).json({ message: "Department not found" });
        }

        await prisma.department.delete({where: {id}});

        return res.status(200).json({
            message: "Department deleted successfully",
        })
    } catch(err){
        console.log("Error while deleting the department");
        res.status(500).json({message: "Server error"});
    }
};