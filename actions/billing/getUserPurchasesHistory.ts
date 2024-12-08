"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
export async function GetUserPurchasesHistory() {
    const { userId } = auth()
    if (!userId) {
        throw new Error("unauthenticated")
    }
    const transactions = await prisma.userPurchase.findMany({
        where: {
            userId
        },
        orderBy: {
            date: "desc"
        }
    })
    return transactions
}