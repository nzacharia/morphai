import React from 'react'
import { Workflow } from '@prisma/client'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'
import Topbar from './topbar/Topbar'
import TaskMenu from './TaskMenu'
function Editor({workflow}:{workflow:Workflow}) {
  return (
    <ReactFlowProvider>
     <div className='h-full flex flex-col w-full overflow-hidden'>
        <Topbar title="Workflow Editor" subtitle={workflow.name} workflowId={workflow.id}/>
        <section className='flex h-full overflow-auto'>
            <TaskMenu/>
         <FlowEditor workflow={workflow}/>
        </section>
     </div>
    </ReactFlowProvider>
  )
}

export default Editor