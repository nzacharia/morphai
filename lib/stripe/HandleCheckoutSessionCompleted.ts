import "server-only"
import Stripe from "stripe"
import { writeFile } from "fs"
import { getCreditsPack, PackId } from "@/types/billing"
import prisma from "../prisma"
export async function HandleCheckoutSessionCompleted(event: Stripe.Checkout.Session) {
    if (!event.metadata) {
        throw new Error("missing metadata")
    }
    const { userId, packId } = event.metadata
    if (!userId) {
        throw new Error("missing userId")
    }
    if (!packId) {
        throw new Error("missing packId")
    }
    const purchasedPack = getCreditsPack(packId as PackId)
    if (!purchasedPack) {
        throw new Error("purchased pack not found")
    }
    await prisma.userBalance.upsert({
        where: {
            userId
        },
        update: {
            credits: { increment: purchasedPack.credits }
        },
        create: {
            userId,
            credits: purchasedPack.credits
        }
    })
    await prisma.userPurchase.create({
        data: {
            userId,
            stripeId: event.id,
            description: `Purchased ${purchasedPack.name} - ${purchasedPack.credits} credits`,
            amount: event.amount_total!,
            currency: event.currency!,
        }
    })
}