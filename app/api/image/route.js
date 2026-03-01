import connectPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
export async function GET(req) {
    const client= await connectPromise;
    const db=client.db("TrendyCrafts")
    const collection=db.collection("Products");
    const data = await collection.find({}).toArray();
    // const originalData= await data.json();
    // console.log(data)
    return NextResponse.json({msg:"data fetched",data:data});
}