import { getAppUrl } from "@/lib/helper/appUrl"
import prisma from "@/lib/prisma"
import { WorkflowStatus } from "@/types/workflow"
export async function GET(request: Request) {
    const now = new Date()
    const workflows = await prisma.workflow.findMany({
        select: {
            id: true,
        },
        where: {
            status: WorkflowStatus.PUBLISHED,
            cron: {
                not: null
            },
            nextRunAt: {
                lte: now
            }
        }
    })
    console.log("WORKFLOWS TO RUN", workflows.length)
    for (const workflow of workflows) {
        triggerWorkflow(workflow.id)
    }
    return Response.json({ workflowsToRun: workflows.length }, { status: 200 })
}

function triggerWorkflow(workflowId: string) {
    const triggerApiUrl = getAppUrl(`api/workflows/execute?workflowId=${workflowId}`)
    fetch(triggerApiUrl, {
        headers: {
            "Authorization": `Bearer ${process.env.MORPH_API_KEY!}`,
            "Content-Type": "application/json"
        },
        cache: "no-store",
        signal: AbortSignal.timeout(40000)
    }).catch(err => {
        console.error("ERROR TRIGGERING WORKFLOW", workflowId, ":error ->", err.message)
    })
}
