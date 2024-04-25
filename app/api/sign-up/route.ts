import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import bcrypt, { hash } from "bcryptjs"

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),           
})


export async function POST (req: NextRequest){


try {

    const {name,email,password} = await req.json();


    const isExistingUser = await prisma.user.findUnique({
        where:{
            email:email
        },
        select:{
            password:true   // to get only the password
        }
    })

    if(isExistingUser){
        return NextResponse.json({error:"User already exists"},{status:409})
    }



    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(password,salt);

   
    const newUser = await prisma.user.create({
        data:{
            name:name,
            email: email,
            password: hashedPassword
        }
    })

   return NextResponse.json({message:"New user has been created"},{status:201});
}
catch(err:any){

    return NextResponse.json({message: err.message},{status:500})
    console.log(err);
}

}
