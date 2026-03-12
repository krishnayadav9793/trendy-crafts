import { sendOTP } from "@/controller/otp.js";
import { NextResponse } from "next/server";
export async function POST(req){
    const body=await req.json();
    const {OTP,email}=body;
    try{
        const res=await sendOTP(OTP,email);
        return NextResponse.json({sucees:true});
    }catch(e){
        console.log("Error from otp",e)
        return NextResponse.json({error:e})
    }
    
}