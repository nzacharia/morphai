'use client'


import React from 'react'
import { Button } from '../../../../components/ui/button'
import { DownloadIcon } from 'lucide-react'

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UnpublishWorkflow } from '@/actions/workflows/unpublishWorkflow';
function UnpublishBtn({workflowId}:{workflowId:string}) {
    const mutation = useMutation({
        mutationFn: UnpublishWorkflow,
        onSuccess: () => {
            toast.success("Workflow unpublished",{id: workflowId})
        },
        onError: () => {
            toast.error("Something went wrong",{id: workflowId})
        }
    })
  return (
    <Button 
    variant={'outline'} 
    className='flex iteams-center gap-2' 
    disabled={mutation.isPending}
    onClick={()=>{

        toast.loading("Unpublishing workflow...",{id: workflowId})
        mutation.mutate(workflowId)
    }}>
        
        
        <DownloadIcon size={16} className='stroke-orange-400'/>
            Unpublish
        
        </Button>
  )
}

export default UnpublishBtn
