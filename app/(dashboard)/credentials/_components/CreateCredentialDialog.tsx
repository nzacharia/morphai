"use client"

import React, { useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle , DialogTrigger} from '../../../../components/ui/dialog'
import { Button } from '../../../../components/ui/button'
import CustomDialogHeader from '../../../../components/CustomDialogHeader'
import { Layers2Icon, Loader2Icon, ShieldEllipsis } from 'lucide-react'
import {  useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCredentialSchema, CreateCredentialSchemaType } from '@/schema/credential'
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkflow } from '@/actions/workflows/createWorkflow'
import { toast } from 'sonner'
import { CreateCredential } from '@/actions/credentials/createCredential'
function CreateCredentialDialog({triggerText}:{triggerText?: string}) {
    const [open, setOpen] = useState(false)

    const form = useForm<CreateCredentialSchemaType>({
        resolver: zodResolver(createCredentialSchema),
    })

    const {mutate, isPending} = useMutation({
        mutationFn: CreateCredential,
        onSuccess: () => {
            toast.success("Credential created", {id: "create-credential"})
            form.reset()
            setOpen(false)
        },
        onError: (error) => {
            toast.error("Failed to create workflow", {id: "create-workflow"})
        }
    })


    const onSubmit = useCallback((values: CreateCredentialSchemaType) => {
        toast.loading("Creating credential...", {id: "create-credential"})
        mutate(values)
    }, [mutate])
  return (
   <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
        <Button>{triggerText ?? "Create"}</Button>
    </DialogTrigger>
    <DialogContent className='px-0'>
        <CustomDialogHeader 
        icon={ShieldEllipsis}
        title='Create Credential'
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
                        Enter a descriptive and unique name for your credential
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name='value'
            render={({field}) => (
                <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                        Value
                        <p className='text-xs text-primary'>(required)</p>
                    </FormLabel>
                    <FormControl>
                        <Textarea  className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>
                        Enter the value associated with your credential
                        <br/>
                        This value will be securely encrypted and stored
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

export default CreateCredentialDialog
