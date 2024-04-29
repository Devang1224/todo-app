import { jwtVerify } from "jose";


export const getJwtSecretKey = ()=>{

    const sec_key = process.env.NEXT_PUBLIC_JWT_KEY;
    if(!sec_key || sec_key.length==0){
        throw new Error("The environment variable JWT_KEY is not set.")
    }
    return sec_key;

}


export async function verfiyToken(user_token:any){
  
    try{

         const verified = await jwtVerify(user_token,new TextEncoder().encode(getJwtSecretKey()))
         return verified;

    }catch(err){
        throw new Error("Your token has expired.")
    }


}