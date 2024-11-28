"use client"

import React, { useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle , DialogTrigger} from '../../../../components/ui/dialog'
import { Button } from '../../../../components/ui/button'
import CustomDialogHeader from '../../../../components/CustomDialogHeader'
import { Layers2Icon, Loader2Icon } from 'lucide-react'
import {  useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createWorkflowSchema, CreateWorkflowSchemaType } from '@/schema/workflow'
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkflow } from '@/actions/workflows/createWorkflow'
import { toast } from 'sonner'
function CreateWorkflowDialog({triggerText}:{triggerText?: string}) {
    const [open, setOpen] = useState(false)

    const form = useForm<CreateWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {},
    })

    const {mutate, isPending} = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {
            toast.success("Workflow created", {id: "create-workflow"})
        },
        onError: (error) => {
            toast.error("Failed to create workflow", {id: "create-workflow"})
        }
    })


    const onSubmit = useCallback((values: CreateWorkflowSchemaType) => {
        toast.loading("Creating workflow...", {id: "create-workflow"})
        mutate(values)
    }, [mutate])
  return (
   <Dialog open={open} onOpenChange={open => {
    setOpen(open)
    form.reset()
   }}>
    <DialogTrigger asChild>
        <Button>{triggerText ?? "Create Workflow"}</Button>
    </DialogTrigger>
    <DialogContent className='px-0'>
        <CustomDialogHeader 
        icon={Layers2Icon}
        title='Create Workflow'
        subtitle='Start building your workflow'
        />
<div className='p-6'>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
            <FormField
            control={form.control}
            name='name'
            render={({field}) => (
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
            render={({field}) => (
                <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                        Description
                        <p className='text-xs text-muted-foreground'>optional</p>
                    </FormLabel>
                    <FormControl>
                        <Textarea  className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>
                        Provide a brief description of your workflow
                        <br/>
                        This description will be used to help you identify your workflow
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
            />
            <Button type='submit' className='w-full' disabled={isPending}>
                {!isPending && "Proceed"}
                {isPending && <Loader2Icon className='animate-spin'/>}
                </Button>
        </form>
    </Form>
</div>
    </DialogContent>
   </Dialog>
  )
}

export default CreateWorkflowDialog