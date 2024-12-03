'use client'


import React from 'react'
import { Button } from '../../../../components/ui/button'
import { PlayIcon } from 'lucide-react'
import useExecutionPlan from '../../../../components/hooks/useExecutionPlan';
import { RunWorkflow } from '../../../../actions/workflows/runWorkflow';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useReactFlow } from '@xyflow/react';
function ExecuteBtn({workflowId}:{workflowId:string}) {

    const generate = useExecutionPlan();
    const {toObject} = useReactFlow()
    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onSuccess: () => {
            toast.success("Execution started",{id: "flow-execution"})
        },
        onError: () => {
            toast.error("Something went wrong",{id: "flow-execution"})
        }
    })
  return (
    <Button 
    variant={'outline'} 
    className='flex iteams-center gap-2' 
    disabled={mutation.isPending}
    onClick={()=>{
        const plan =generate();
        if(!plan){
            //client side validation
            return
        }
        mutation.mutate({
            workflowId: workflowId, 
            flowDefinition: JSON.stringify(toObject())
        })
    }}>
        
        
        <PlayIcon size={16} className='stroke-orange-400'/>
        Execute
        
        </Button>
  )
}

export default ExecuteBtn