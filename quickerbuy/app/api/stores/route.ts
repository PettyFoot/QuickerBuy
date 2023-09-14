import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req:Request) {
    try {

        const userId = auth();
        const body = await req.json();

        const { name } = body;

        if(userId){
            return new NextResponse("Unauthorized", {status: 402});
        }

        if(!name){
            return new NextResponse("Name is required", {status: 403})
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userID
            }
        })


        
    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse("Internal error", {status: 500});
        
    }
    
}