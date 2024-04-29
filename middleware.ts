import { verfiyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){

    const user_token = req.cookies.get("JWT_TOKEN")?.value || "";
    
    const verifiedUser =
      user_token &&
      (await verfiyToken(user_token).catch((err) => {
        console.log(err);
      }));
  
   if(!verifiedUser){
    return NextResponse.redirect(new URL("/sign-up",req.url))
  }


}


export const config = {
    matcher:[
        "/",
        "/sign-in",
        "/sign-up"
    ]
}