"use client"

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { CreditsPack, CreditsPacks } from "@/types/billing"
import { CoinsIcon, CreditCardIcon } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PackId } from '@/types/billing'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { PurchaseCredits } from '@/actions/billing/purchaseCredits'
function CreditsPurchase() {
    const [selectedPack, setSelectedPack] = useState(PackId.MEDIUM)
    const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true'
    const handlePackChange = (value: string) => {
        setSelectedPack(value as PackId)
    }
    const mutation = useMutation({
        mutationFn:  PurchaseCredits,
        onSuccess: () => {
            toast.success("Credits purchased successfully")
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })
    if (!stripeEnabled) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Purchase Credits</CardTitle>
                    <CardDescription>Billing is currently disabled</CardDescription>
                </CardHeader>
            </Card>
        )
    }
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <CoinsIcon  className="text-primary h-6 w-6" /> 
                Purchase Credits
            </CardTitle>
            <CardDescription>
                Purchase credits to continue using thundrAI.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="">
                <RadioGroup onValueChange={handlePackChange} value={selectedPack}>
                    {CreditsPacks.map(pack => (
                        <div key={pack.id} className="flex items-center space-x-3 bg-secondary/50 p-3 hover:bg-secondary" onClick={() => setSelectedPack(pack.id)}>
                            <RadioGroupItem value={pack.id} id={pack.id} />
                            <Label className="flex justify-between w-full cursor-pointer">
                                <span className="font-medium">{pack.name} - {pack.label}</span>
                                <span className="font-bold text-primary">
                                    $ {(pack.price / 100).toFixed(2)}
                                </span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" disabled={mutation.isPending} onClick={() => mutation.mutate(selectedPack)}>
                <CreditCardIcon className="w-5 h-5 mr-2" />
                Purchase credits
            </Button>
        </CardFooter>
    </Card>
  )
}

export default CreditsPurchase