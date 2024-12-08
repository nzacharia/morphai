"use client"

import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { FileIcon, Loader2Icon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { DownloadInvoice } from '@/actions/billing/downloadInvoice'
function InvoiceBtn({ id }: { id: string }) {
    const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true'
    
    if (!stripeEnabled) {
        return null // Hide the button when Stripe is disabled
    }
    const mutation = useMutation({
        mutationFn:  DownloadInvoice,
        onSuccess: (data) => {
           (window.location.href = data as string)
        },
        onError: () => {
            toast.error('Failed to download invoice')
        }
    })
  return (
    <Button 
    variant="ghost" 
    size="sm" 
    className='text-xs gap-2 text-muted-foreground px-1' 
        disabled={mutation.isPending}
        onClick={() => mutation.mutate(id)}
    >
        Invoice
       {mutation.isPending && <Loader2Icon className="w-4 h-4 animate-spin" />}
    </Button>
  )
}

export default InvoiceBtn