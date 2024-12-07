import React from 'react'
import { WorkflowExecutionStatus } from "@/types/workflow"
import { cn } from '@/lib/utils'


const indicatorColors: Record<WorkflowExecutionStatus, string> = {
    PENDING: 'bg-slate-400',
    RUNNING: 'bg-yellow-400',
    COMPLETED: 'bg-green-400',
    FAILED: 'bg-red-400'
}
export default function ExecutionStatusIndicator({ status }: { status: WorkflowExecutionStatus }) {
    return (
        <div className={cn('w-2 h-2 rounded-full', indicatorColors[status])} />
    )
}

const labelColors: Record<WorkflowExecutionStatus, string> = {
    PENDING: 'text-slate-600',
    RUNNING: 'text-yellow-600',
    COMPLETED: 'text-green-600',
    FAILED: 'text-red-600'
}
export function ExecutionStatusLabel({ status }: { status: WorkflowExecutionStatus }) {
    return (
        <span className={cn('lowercase', labelColors[status])}>{status}</span>
    )
}
