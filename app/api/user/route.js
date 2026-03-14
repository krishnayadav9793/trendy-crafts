import { NextResponse } from "next/server";
import { getEmailFromToken } from "@/lib/jwtDecoder";
import { sql } from "@/lib/neonConnect";
export async function GET(req){
    
    const data=req.cookies.get("token").value;
    console.log(data)
    const email= getEmailFromToken(data);
    // console.log(email)
    try{
        const user=await sql`select * from "User" where email=${email}`;
        // console.log(user)
        return NextResponse.json({data:user[0],success:true})
    }catch(e){
        console.log("error:",e);
        return NextResponse.json({error:e,success:false})
    }
    
}