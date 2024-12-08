"use server"

import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import stripe from '@/lib/stripe/stripe'

export async function DownloadInvoice(id : string) {
    const {userId} = auth()
    if (!userId) {
        throw new Error('Unauthenticated')
    }

    const purchase = await prisma.userPurchase.findUnique({
        where: {
            id,
            userId,
        },
    })
    if (!purchase) {
        throw new Error('Purchase not found')
    }

    const session = await stripe.checkout.sessions.retrieve(purchase.stripeId)
    if (!session.invoice) {
        throw new Error('Invoice not found')
    }

    const invoice = await stripe.invoices.retrieve(session.invoice as string)
    return invoice.hosted_invoice_url
}