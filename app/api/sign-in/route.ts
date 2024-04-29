import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req:NextRequest){

try{
 
const {email,password} = await req.json();

const getUser = await prisma.user.findUnique({
    where:{
        email:email,
    }
})
if(!getUser){
    return NextResponse.json({message:"User does not exist"},{status:404});
}

const isEqualPassword = await bcrypt.compare(password,getUser.password);
if(!isEqualPassword){
    return NextResponse.json({message:"Password is incorrect"},{status:409})
}


const jwt_token = await jwt.sign(
    {name:getUser.name,
     email:getUser.email,
     password:getUser.password
    },
    process.env.NEXT_PUBLIC_JWT_KEY !,
    {expiresIn:'7d'}

)

const response = NextResponse.json({message:"Logined successfully"},{status:200});

response.cookies.set('JWT_TOKEN',jwt_token,{httpOnly:true}); // httpOnly for security purpose

return response;

// jwt logic

}
catch(err){

    console.log(err);
    return NextResponse.json({message:"Error while processing try again",status:500});
}

}