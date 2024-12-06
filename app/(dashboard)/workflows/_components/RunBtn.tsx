"use client"

import { RunWorkflow } from '@/actions/workflows/runWorkflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
import { PlayIcon } from 'lucide-react'
function RunBtn({workflowId}:{workflowId:string}) {

    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onSuccess: () => {
            toast.success("Workflow started", {id: workflowId})
        },
        onError: () => {
            toast.error("Failed to run workflow", {id: workflowId})
        }
    })
  return (
            <Button 
            variant="outline" 
            size="sm" 
            className='flex items-center gap-2' 
            disabled={mutation.isPending}
            onClick={() => {
                toast.loading("Scheduling workflow...", {id: workflowId})
                mutation.mutate({workflowId})
            }}>
                <PlayIcon size={16} />
                Run
            </Button>
  )
}

export default RunBtn