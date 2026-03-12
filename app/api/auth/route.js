import connectPromise from "@/lib/mongodb"
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwtTokens";


export async function POST(req, res, next) {
    const body = await req.json();
    const { userName, email, password } = body;
    // console.log(req);
    const client = await connectPromise;
    const db = client.db("TrendyCrafts");
    const user = db.collection("Users");
    const isAlraedySignedUp = await user.findOne({ email: email });
    if (isAlraedySignedUp) return NextResponse.json({ msg: "user already exsists" })
    await user.insertOne({ name: userName, email: email, password: password })
   const token = await generateToken(email);

    const response = NextResponse.json({ success: true });

    
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24* 7, 
    });

    return response;
}

export async function GET(req, res, next) {

    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    console.log(email,password);
    const client = await connectPromise;
    const db = client.db("TrendyCrafts");
    const user = db.collection("Users");
    const userData = await user.findOne({ email: email })
    if (!userData) return NextResponse.json({ msg: "No user record found" });
    if (userData.password !== password) return NextResponse.json({ msg: "Wrong password" });
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


