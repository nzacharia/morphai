"use server"

import { getCreditsPack } from "@/types/billing"

import { PackId } from "@/types/billing"
import { auth } from "@clerk/nextjs/server"
import stripe from "@/lib/stripe/stripe"
import { getAppUrl } from "@/lib/helper/appUrl"
import { redirect } from "next/navigation"
export async function PurchaseCredits(packId: PackId) {
    const { userId } = auth()
    if (!userId) {
        throw new Error("unauthenticated")
    }
    const selectedPack = getCreditsPack(packId)
    if (!selectedPack) {
        throw new Error("invalid pack")
    }
    const priceId = selectedPack?.priceId

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price: selectedPack.priceId,
            quantity: 1
        }],
        invoice_creation: { enabled: true },
        mode: "payment",
        success_url: getAppUrl("billing"),
        cancel_url: getAppUrl("billing"),
        metadata: {
            userId,
            packId
        }
    })
    if (!session.url) {
        throw new Error("failed to create stripe session")
    }
    redirect(session.url)

}