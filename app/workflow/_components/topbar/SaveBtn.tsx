'use client'

import React from 'react'
import { Button } from '../../../../components/ui/button'
import { CheckIcon } from 'lucide-react'
import { useReactFlow } from '@xyflow/react'
import { UpdateWorkflow } from '../../../../actions/workflows/updateWorkflow'
import {useMutation} from "@tanstack/react-query"
import { toast } from 'sonner'

function SaveBtn({workflowId}:{workflowId:string}) {
  const {toObject} = useReactFlow()
  const saveMutation = useMutation({
    mutationFn:UpdateWorkflow,
    onSuccess: ()=>{
        toast.success("Flow saved successfully",{id:"save-workflow"})
    },
    onError: ()=>{
        toast.error("Something went wrong",{id:"save-workflow"})
    }
  })
  return (
    <Button variant={'outline'} className='flex items-center gap-2' onClick={()=>{
        const workflowDefinition = JSON.stringify(toObject())
        toast.loading("Saving workflow...",{id:"save-workflow"})
        saveMutation.mutate({id:workflowId,definition:workflowDefinition})
    }}>
        <CheckIcon size={16} className='stroke-green-400'/>
        Save
    </Button>
  )
}

export default SaveBtn