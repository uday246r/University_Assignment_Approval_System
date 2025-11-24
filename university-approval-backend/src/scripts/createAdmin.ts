import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createAdmin(){
    const email = "admin246@gmail.com";
    const password = "radheradhe";
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const existingAdmin = await prisma.user.findUnique({
            where: {email},
        });

        if(existingAdmin){
            console.log("Admin already exists!");
            return;
        }

        await prisma.user.create({
            data:{
                email,
                name: "System Admin",
                password: hashedPassword,
                role: "ADMIN",
            },
        });
        console.log("Admin user created successfully");
    } catch(err){
        console.log("Error occur in admin creation", err);
    } finally{
        await prisma.$disconnect();
    }
}

createAdmin();