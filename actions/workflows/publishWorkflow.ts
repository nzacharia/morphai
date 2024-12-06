"use server"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { WorkflowStatus } from "@/types/workflow"
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan"
import { CalculateWorkflowCost } from "@/lib/workflow/helpers"
import { revalidatePath } from "next/cache"
export async function PublishWorkflow({ id, flowDefinition }: { id: string, flowDefinition: string }) {
    const { userId } = auth()
    if (!userId) {
        throw new Error("Unauthenticated")
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId
        }
    })
    if (!workflow) {
        throw new Error("Workflow not found")
    }
    if (workflow.status !== WorkflowStatus.DRAFT) {
        throw new Error("Workflow is not a draft")
    }


    const flow = JSON.parse(flowDefinition)
    const result = FlowToExecutionPlan(flow.nodes, flow.edges)
    if (result.error) {
        throw new Error("Invalid workflow definition")
    }
    if (!result.executionPlan) {
        throw new Error("no execution plan found")
    }

    const creditsCost = CalculateWorkflowCost(flow.nodes)
    await prisma.workflow.update({
        where: {
            id,
            userId
        },
        data: {
            definition: flowDefinition,
            executionPlan: JSON.stringify(result.executionPlan),
            creditsCost,
            status: WorkflowStatus.PUBLISHED
        }
    })
    revalidatePath(`/workflow/editor/${id}`)
}