import React, { Suspense } from 'react'
import TopBar from '../../../_components/topbar/TopBar'
import { waitFor } from '../../../../../lib/helper/waitFor'
import { Loader2Icon } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { GetWorkflowExecutionWithPhases } from '../../../../../actions/workflows/getWorkflowExecutionWithPhases'
import ExecutionViewer from './_components/ExecutionViewer'
export default function ExecutionViewerPage(
    {
        params
    }: {
        params: { 
            workflowId: string, 
            executionId: string 
        }
    }) {
    return <div className='flex flex-col h-screen w-full overflow-hidden'>
      <TopBar 
      title="Workflow run details" 
      workflowId={params.workflowId} 
      subtitle={`Run ID: ${params.executionId}`} 
      hideButtons
      />
      <section className='flex h-full overflow-auto'>
        <Suspense fallback={
            <div>
                <Loader2Icon  className='h-10 w-10 stroke-primary animate-spin' />
            </div>}>
            <ExecutionViewerWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
}

async function ExecutionViewerWrapper({executionId}:{executionId:string}){

    const workflowExecution = await GetWorkflowExecutionWithPhases(executionId)
    if(!workflowExecution) return <div>not found</div>
    return <ExecutionViewer initialData={workflowExecution} />
}
