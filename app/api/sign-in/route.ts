import { NextRequest } from "next/server";

export async function POST(req:NextRequest){

try{
 
const {email,password} = await req.json();




}
catch(err){
    console.log(err);
}

}