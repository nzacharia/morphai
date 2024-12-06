'use client'
import React from 'react'
import { Workflow } from '@prisma/client'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'
import Topbar from './topbar/Topbar'
import TaskMenu from './TaskMenu'
import { FlowValidationContextProvider } from '../../../components/context/FlowValidationContext'
import { WorkflowStatus } from '@/types/workflow'
function Editor({workflow}:{workflow:Workflow}) {
  return (
    <FlowValidationContextProvider>
    <ReactFlowProvider>
     <div className='h-full flex flex-col w-full overflow-hidden'>
        <Topbar 
          title="Workflow Editor" 
        subtitle={workflow.name} 
        workflowId={workflow.id} 
        isPublished={workflow.status === WorkflowStatus.PUBLISHED}
        />
        <section className='flex h-full overflow-auto'>
            <TaskMenu/>
         <FlowEditor workflow={workflow}/>
        </section>
     </div>
    </ReactFlowProvider>
    </FlowValidationContextProvider>
  )
}

export default Editor