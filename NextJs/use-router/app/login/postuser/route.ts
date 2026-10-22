import { users } from "@/app/data/users";
import {NextResponse} from "next/server";

export async function POST(req:Request) {
    const body=await req.json();

    users.push({
        id:users.length+1,
        name:body.name,
    });
    return NextResponse.json({
        message:"User Added",
        users,
    })
}

export async function GET() {
    console.log("POSTUSER API HIT");
    return NextResponse.json(users)
}

export async function PUT(req:Request) {
    const body=await req.json();
    const user=users.find((u)=>u.id===body.id);
    if(user){
        user.name=body.name;
    }
    return Response.json({
        message:"User Updated",
        users,
    })
}
export async function DELETE(req:Request) {
    const body=await req.json();
    const index=users.findIndex((u)=>u.id===body.id);
    if(index !== -1){
        users.splice(index,1);
    }
    return Response.json({
        message:"User Updated",
        users,
    })
}

