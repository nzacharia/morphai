import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecution";
import Topbar from "../../_components/topbar/Topbar";
import { Suspense } from "react";
import { InboxIcon, Loader2Icon } from "lucide-react";
import { waitFor } from "@/lib/helper/waitFor"
import ExecutionsTable from "./_components/ExecutionsTable";
export default function ExecutionPage({
    params
}: {
    params: { workflowId: string }
}) {
    return <div className='h-full w-full overflow-auto'>
        <Topbar 
        title='All runs' 
        subtitle="List of all runs for this workflow"
        hideButtons={true} 
        workflowId={params.workflowId} />
        <Suspense fallback={<div className="flex justify-center items-center h-full w-full"><Loader2Icon size={30} className="stroke-primary animate-spin" /></div>}>
            <ExecutionTableWrapper workflowId={params.workflowId} />
        </Suspense>
    </div>
}

async function ExecutionTableWrapper({workflowId}:{workflowId:string}) {
  
    const executions = await GetWorkflowExecutions(workflowId)
    if(!executions) {
        return <div>No data</div>
    }
    if(executions.length === 0) {
        return <div className="container w-full py-6">
            <div className="flex flex-col items-center gap-2 justify-center">
                <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                    <InboxIcon size={40} className="stroke-primary" />
                </div>
                <div className="flex flex-col gap-1 text-center">
                   <p className="font-bold">No worfklows have been triggered yet for this workflow</p>
                   <p className="text-sm text-muted-foreground">You can trigger a workflow in the editor page</p>
                </div>
            </div>
        </div>
    }
    return <div className="container w-full py-6">
        <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
}
