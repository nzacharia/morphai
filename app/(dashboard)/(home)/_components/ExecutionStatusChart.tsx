"use client"


import React from 'react'
import { GetWorkflowExecutionsStats } from '@/actions/analytics/getWorfklowExecutionStats'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { Layers2 } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionsStats>>
const chartConfig: ChartConfig = {
    success: {
        label: 'Success',
        color: 'hsl(var(--chart-2))'
    },
    failed: {
        label: 'Failed',
        color: 'hsl(var(--chart-1))'
    }
}
function ExecutionStatusChart({ data }: { data: ChartData }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-bold flex items-center gap-2'>
                    <Layers2 className='w-6 h-6 text-primary' /> Workflow Execution Status
                </CardTitle>
                <CardDescription>
                    Daily number of successful and failed workflow executions
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className='max-h-[200px] w-full' config={chartConfig}>
                    <AreaChart data={data} height={200} accessibilityLayer margin={{top:20}}>
                        <CartesianGrid vertical={false} />
                        <XAxis 
                        dataKey='date' 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={8} 
                        minTickGap={32} 
                        tickFormatter={(value)=>{ 
                            const date = new Date(value)
                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        }}/>
                        <ChartLegend content={<ChartLegendContent />} />
                        <ChartTooltip content={<ChartTooltipContent className='w-[250px]' />} />
                        <Area min={0} type='bump' fill="var(--color-success)"  stackId={"a"} stroke="var(--color-success)" fillOpacity={0.6} dataKey='success' />
                        <Area min={0} type='bump' fill="var(--color-failed)" stackId={"a"} stroke="var(--color-failed)" fillOpacity={0.6} dataKey='failed' />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default ExecutionStatusChart