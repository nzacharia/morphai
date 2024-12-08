"use client"

import React, { useState } from 'react'
import { Period } from '@/types/analytics'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
function PeriodSelector({ selectedPeriod, periods }: { selectedPeriod: Period, periods: Period[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handlePeriodChange = (value: string) => {
        const [month, year] = value.split('-')
        const params = new URLSearchParams(searchParams)
        params.set('month', month)
        params.set('year', year)
        router.push(`?${params.toString()}`);
    }
    return (
        <Select onValueChange={handlePeriodChange} value={`${selectedPeriod.month}-${selectedPeriod.year}`}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a period" />
            </SelectTrigger>
            <SelectContent>
                {periods.map((period, index) => (
                    <SelectItem key={index} value={`${period.month}-${period.year}`}>{`${MONTH_NAMES[period.month]} ${period.year}`}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default PeriodSelector