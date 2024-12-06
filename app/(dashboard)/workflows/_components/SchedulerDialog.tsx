"use client"
import { updateWorkflowCron } from '@/actions/workflows/updateWorkflowCron'
import CustomDialogHeader from '@/components/CustomDialogHeader'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import cronstrue from 'cronstrue'
import parser from "cron-parser"
import { removeWorkflowSchedule } from '@/actions/workflows/removeWorkflowSchedule'
import { Separator } from '@/components/ui/separator'
function SchedulerDialog(props: { cron: string | null, workflowId: string }) {
    const [cron, setCron] = useState(props.cron || "")
    const [validCron, setValidCron] = useState(false)
    const [readableCron, setReadableCron] = useState("")
    const mutation = useMutation({
        mutationFn: updateWorkflowCron,
        onSuccess: () => {
            toast.success("Schedule updated successfully", { id: "cron" })
        },
        onError: () => {
            toast.error("Something went wrong", { id: "cron" })
        }
    })
    const removeScheduleMutation = useMutation({
        mutationFn: removeWorkflowSchedule,
        onSuccess: () => {
            toast.success("Schedule removed successfully", { id: "cron" })
        },
        onError: () => {
            toast.error("Something went wrong", { id: "cron" })
        }
    })
    useEffect(() => {
        try {
            parser.parseExpression(cron)
            const humanCronStr = cronstrue.toString(cron)
            setValidCron(true)
            setReadableCron(humanCronStr)
        } catch (e) {
            setValidCron(false)
        }
    }, [cron])
    const workflowHasValidCron = props.cron && props.cron.length > 0
    const readableSavedCron = workflowHasValidCron && cronstrue.toString(props.cron!)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='link' size='sm' className={cn(
                    "text-sm p-0 h-auto text-orange-500", workflowHasValidCron && "text-primary"
                )}
                >
                    {workflowHasValidCron && <div className='flex items-center gap-2'>
                        <ClockIcon />
                        {readableSavedCron}
                    </div>
                    }
                    {!workflowHasValidCron && <div className='flex items-center gap-1'>
                        <TriangleAlertIcon className='w-3 h-3 ' /> Set schedule

                    </div>}
                </Button>
            </DialogTrigger>
            <DialogContent className="px-0">
                <CustomDialogHeader title='Schedule workflow execution' icon={CalendarIcon} />
                <div className="p-6 space-y-4">
                    <p className='text-sm text-muted-foreground'>
                        Specify a cron expression to schedule periodic workflow execution.
                        All times are in UTC.
                    </p>
                    <Input
                        placeholder='E.g. * * * * *'
                        value={cron}
                        onChange={(e) => setCron(e.target.value)} />
                    <div className={cn("bg-accent rounded-md p-4 border text-sm border-destructive text-destructive", validCron && "border-primary text-primary")}>
                        {validCron ? readableCron : "Invalid cron expression"}
                    </div>
                    {workflowHasValidCron && (
                        <DialogClose asChild>
                            <div className='flex flex-col gap-4'>
                                <Button
                                size='sm'
                                className='w-full text-destructive border-destructive hover:text-destructive'
                                disabled={removeScheduleMutation.isPending || mutation.isPending}
                                variant='outline'
                                onClick={() => {
                                    toast.loading("Removing schedule...", { id: "cron" })
                                    removeScheduleMutation.mutate({ id: props.workflowId })
                                }}
                            >Remove schedule</Button>
                                <Separator className='my-4' />
                            </div>
                        </DialogClose>
                    )}
                </div>
                <DialogFooter className='px-6 gap-2'>
                    <DialogClose asChild>
                        <Button className='w-full' variant='secondary'>Cancel</Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button className='w-full' disabled={mutation.isPending || !validCron} onClick={() => {
                            toast.loading("Saving...", { id: "cron" })
                            mutation.mutate({ id: props.workflowId, cron })
                        }}>Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SchedulerDialog