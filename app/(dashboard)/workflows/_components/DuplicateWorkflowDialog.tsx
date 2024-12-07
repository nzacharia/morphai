"use client"

import React, { useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog'
import { Button } from '../../../../components/ui/button'
import CustomDialogHeader from '../../../../components/CustomDialogHeader'
import { CopyIcon, Layers2Icon, Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { duplicateWorkflowSchema, DuplicateWorkflowSchemaType } from '@/schema/workflow'
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { DuplicateWorkflow } from '@/actions/workflows/duplicateWorkflow'
import { cn } from '@/lib/utils'
function DuplicateWorkflowDialog({ workflowId }: { workflowId: string }) {
    const [open, setOpen] = useState(false)

    const form = useForm<DuplicateWorkflowSchemaType>({
        resolver: zodResolver(duplicateWorkflowSchema),
        defaultValues: {
            workflowId,
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: DuplicateWorkflow,
        onSuccess: () => {
            toast.success("Workflow duplicated", { id: "duplicate-workflow" })
            setOpen(prev => !prev)
        },
        onError: (error) => {
            toast.error("Failed to duplicate workflow", { id: "duplicate-workflow" })
        }
    })


    const onSubmit = useCallback((values: DuplicateWorkflowSchemaType) => {
        toast.loading("Duplicating workflow...", { id: "duplicate-workflow" })
        mutate(values)
    }, [mutate])
    return (
        <Dialog open={open} onOpenChange={open => {
            setOpen(open)
            form.reset()
        }}>
            <DialogTrigger asChild>
                <Button
                    variant='ghost'
                    size={"icon"}
                    className={cn("ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100 ")}>
                    <CopyIcon className='text-muted-foreground w-4 h-4 cursor-pointer' />
                </Button>
            </DialogTrigger>
            <DialogContent className='px-0'>
                <CustomDialogHeader
                    icon={Layers2Icon}
                    title='Duplicate Workflow'

                />
                <div className='p-6'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex gap-1 items-center'>
                                            Name
                                            <p className='text-xs text-primary'>*</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Choose a descriptive and unique name for your workflow
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex gap-1 items-center'>
                                            Description
                                            <p className='text-xs text-muted-foreground'>optional</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea className='resize-none' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a brief description of your workflow
                                            <br />
                                            This description will be used to help you identify your workflow
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full' disabled={isPending}>
                                {!isPending && "Proceed"}
                                {isPending && <Loader2Icon className='animate-spin' />}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DuplicateWorkflowDialog
