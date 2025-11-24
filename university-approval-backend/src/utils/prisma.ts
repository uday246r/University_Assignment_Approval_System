import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection(){
    try{
        await prisma.$connect();
        console.log("Prisma connected to PostgresSQL sucessfully!");
    }
    catch(err){
        console.error("Error occur",err);
    }
}

testConnection();

export default prisma;