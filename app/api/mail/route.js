
import { sendMail } from '@/controller/sendMail';

export async function POST(req){
    const body=await req.json();
    const {email,query,name}=body;
    try{
        await sendMail(email)
        return Response.json({msg:"massage sent"});
    }catch(e){
        console.log("error in route",e)
        return Response.json({msg:"error"})
    }
}


