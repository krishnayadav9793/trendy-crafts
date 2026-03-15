import { NextResponse } from "next/server";
import { getEmailFromToken } from "@/lib/jwtDecoder";
import { sql } from "@/lib/neonConnect";
export async function GET(req){
    
    const data=req.cookies.get("token").value;
    // console.log(data)
    const id= getEmailFromToken(data);
    // console.log(email)
    try{
        const user=await sql`select * from "User"  where id=${id}`;
        // console.log(user)
        const order = await sql`select * from "Order" where "User_id"=${id}`
        
        return NextResponse.json({data:user[0],order:order,success:true})
    }catch(e){
        console.log("error:",e);
        return NextResponse.json({error:e,success:false})
    }
    
}