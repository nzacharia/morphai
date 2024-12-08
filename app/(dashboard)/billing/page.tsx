import { getAvailableCredits } from "@/actions/billing/getAvailableCredits";
import ReactCountUpWrapper from "@/components/ReactCountUpWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftIcon, ArrowLeftRightIcon, CoinsIcon } from "lucide-react";
import { Suspense } from "react";
import CreditsPurchase from "./_components/CreditsPurchase";
import { Period } from "@/types/analytics";
import { GetCreditsUsageInPeriod } from "@/actions/analytics/getCreditsUsageInPeriod";
import CreditsUsageChart from "./_components/ExecutionStatusChart";
import { GetUserPurchasesHistory } from "@/actions/billing/getUserPurchasesHistory";
import { Victor_Mono } from "next/font/google";
import InvoiceBtn from "./_components/InvoiceBtn";
export default async function BillingPage() {
    return (
        <div className="mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold">Billing</h1>
            <Suspense fallback={<Skeleton className="w-full h-[166px]" />}>
                <BalanceCard />
            </Suspense>
            <CreditsPurchase />
            <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
                <CreditUsageCard />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
                <TransactionHistoryCard />
            </Suspense>
        </div>
    )
}

async function BalanceCard() {
    const userBalance = await getAvailableCredits()
    return (
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden" >
            <CardContent className="p-6 relative items-center">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">Available Credits</h3>
                    </div>
                    <p className="text-4xl text-primary font-bold">
                        <ReactCountUpWrapper value={userBalance} />
                    </p>
                    <CoinsIcon size={140} className="text-primary absolute opacity-20 bottom-0 right-0" />
                </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
                When your credit balance reaches zero, you will be unable to run workflows. Upgrade to continue.

            </CardFooter>

        </Card>
    )
}

async function CreditUsageCard() {
    const period: Period = {
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    }
    const data = await GetCreditsUsageInPeriod(period)
    return (
        <CreditsUsageChart data={data} title={'Credits consumed '} description={'Daily credits consumed in the current month'} />
    )
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

function formatAmount(amount: number, currency: string) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100)
}

async function TransactionHistoryCard() {
    const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true'
    
    if (!stripeEnabled) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Billing is currently disabled</CardDescription>
                </CardHeader>
            </Card>
        )
    }
    const purchases = await GetUserPurchasesHistory()
    return (
        <Card>
            <CardHeader >
                <CardTitle className="text-2xl font-bold flex items-center gap-1">
                    <ArrowLeftRightIcon className="h-6 w-6 text-primary" />
                    Transaction History
                </CardTitle>
                <CardDescription>View your transaction history and download invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {purchases.length === 0 && <p className="text-muted-foreground">No transactions found</p>}
                {purchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                        <div className="">
                            <p className="font-medium">{formatDate(purchase.date)}</p>
                            <p className="text-sm text-muted-foreground">{purchase.description}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">
                                {formatAmount(purchase.amount, purchase.currency)}
                            </p>
                            <InvoiceBtn id={purchase.id} />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}