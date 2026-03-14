
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwtTokens";
import { sql } from "@/lib/neonConnect";
import bcrypt from 'bcrypt'

export async function POST(req, res, next) {
    const body = await req.json();
    const { name, email, password ,gender,phone} = body;
    // console.log(req);
    try {
        const isAlraedySignedUp = await sql`select * from "User" where email=${email}`
        // console.log(isAlraedySignedUp)
        if (isAlraedySignedUp.length != 0) return NextResponse.json({ msg: "User already exsists" })
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`insert into "User" ("email","password","name","gender","phone") values (${email},${hashedPassword},${name},${gender},${phone})`
        const token = await generateToken(email);
        const response = NextResponse.json({ success: true,msg:"Account Created." });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (e) {
        console.log(e)
        return Response.json({error:e});
    }

}

export async function GET(req, res, next) {

    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    console.log(email, password);
    
    const userData = await sql`select * from "User" where email=${email}`
    if (userData.length ==0) return NextResponse.json({ msg: "No user record found" });
    const isCorrectPassword=bcrypt.compare(userData[0].password,password);
    if (!isCorrectPassword) return NextResponse.json({ msg: "Wrong password" });
    const token = await generateToken(email);

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return response;


};


