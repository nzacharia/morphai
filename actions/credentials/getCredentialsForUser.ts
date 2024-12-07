"use server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
export async function GetCredentialsForUser() {
    const {userId} = auth()
    if(!userId) {
        throw new Error("Unauthenticated")
    }
    const credentials = await prisma.credential.findMany({
        where: {
            userId
        },
        orderBy: {
            name: "asc"
        }
    })
    return credentials
}