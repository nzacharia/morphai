"use client"

import React from 'react'

import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/ui/table'
import { GetWorkflowExecutions } from '@/actions/workflows/getWorkflowExecution'
import { useQuery } from '@tanstack/react-query'
import { DatesToDurationString } from '@/lib/helper/dates'
import { CoinsIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ExecutionStatusIndicator from './ExecutionStatusIndicator'
import { WorkflowExecutionStatus } from '@/types/workflow'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>
function ExecutionsTable({ workflowId, initialData }: { workflowId: string, initialData: InitialDataType }) {
    const router = useRouter()
    const query = useQuery({
        queryKey: ["executions", workflowId],
        initialData: initialData,
        queryFn: () => GetWorkflowExecutions(workflowId),
        refetchInterval: 5000
    })
    return (
        <div className='border rounded-lg shadow-md overflow-auto'>
            <Table className='h-full'>
                <TableHeader className='bg-muted'>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Credits Consumed</TableHead>
                        <TableHead className='text-right text-xs text-muted-foreground'>Started At(desc)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='gap-2 h-full overflow-auto'>

                    {query.data?.map((execution) => {
                        const duration = DatesToDurationString(execution.startedAt, execution.completedAt)
                        const formattedStartedAt = execution.startedAt ? formatDistanceToNow(execution.startedAt, { addSuffix: true }) : 'N/A'
                        return (
                            <TableRow key={execution.id} className="cursor-pointer" onClick={() => {
                                router.push(`/workflow/runs/${execution.workflowId}/${execution.id}`)
                            }}>
                                <TableCell>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>{execution.id}</span>
                                        <div className='text-xs text-muted-foreground'>
                                            <span>Triggere via</span>
                                            <Badge variant='outline'>{execution.trigger}</Badge>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex flex-col'>
                                        <div className='flex items-center gap-2'>
                                            <ExecutionStatusIndicator status={execution.status as WorkflowExecutionStatus} />
                                            <span className='font-semibold capitalize'>{execution.status}</span>
                                        </div>
                                        <div className='text-xs mx-5 text-muted-foreground'>
                                            {duration}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex flex-col'>
                                        <div className='flex items-center gap-2'>
                                            <CoinsIcon size={16} className='text-primary' />
                                            <span className='font-semibold capitalize'>{execution.creditsConsumed}</span>
                                        </div>
                                        <div className='text-xs mx-5 text-muted-foreground'>
                                            Credits
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='text-right  text-muted-foreground'>
                                    {formattedStartedAt}

                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default ExecutionsTable