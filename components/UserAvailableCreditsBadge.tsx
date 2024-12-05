"use client"

import { useQuery } from '@tanstack/react-query'
import { getAvailableCredits } from '@/actions/billing/getAvailableCredits'
import React from 'react'
import { CoinsIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ReactCountUpWrapper from './ReactCountUpWrapper'
import { buttonVariants } from './ui/button'

function UserAvailableCreditsBadge() {
    const query = useQuery({queryKey: ["user-available-credits"], queryFn: ()=> getAvailableCredits(), refetchInterval: 30 * 1000})
  return (
    <Link href="/billing" className={cn("w-full space-x-2 items-center", buttonVariants({variant: "outline"}))}>
        <CoinsIcon size={20} className="text-primary" />
        <span className="font-semibold capitalize">
            {query.isLoading && <Loader2Icon size={20} className="w-4 h-4 animate-spin" />}
            {!query.isLoading && query.data && <ReactCountUpWrapper value={query.data} />}
            {!query.isLoading && query.data === undefined && "-"}
        </span>
    </Link>
  )
}

export default UserAvailableCreditsBadge