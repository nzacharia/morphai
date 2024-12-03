"use server"
import { auth } from "@clerk/nextjs/server"
import prisma from "../../lib/prisma"
import { WorkflowExecutionPlan, WorkflowExecutionStatus, ExecutionPhaseStatus, WorkflowExecutionTrigger } from "../../types/workflow"
import { FlowToExecutionPlan } from "../../lib/workflow/executionPlan"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { redirect } from "next/navigation"
import { ExecuteWorkflow } from "@/lib/workflow/executableWorkflow"
export async function RunWorkflow(form: {
    workflowId: string
    flowDefinition?: string
}) {
    const { userId } = auth()
    if (!userId) {
        return { error: "unauthenticated" }
    }
    const { workflowId, flowDefinition } = form;
    if (!workflowId) {
        return { error: "workflowId is required" }
    }
    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId
        }
    })
    if (!workflow) {
        return { error: "workflow not found" }
    }
    let executionPlan: WorkflowExecutionPlan
    if (!flowDefinition) {
        throw new Error("flowDefinition is not provided")
    }
    const flow = JSON.parse(flowDefinition)
    const result = FlowToExecutionPlan(flow.nodes, flow.edges)
    if (result.error) {
        throw new Error("flow definition not found")
    }
    if (!result.executionPlan) {
        throw new Error("no execution plan generated")
    }
    executionPlan = result.executionPlan

    const execution = await prisma.workflowExecution.create({
        data: {
            workflowId,
            userId,
            trigger: WorkflowExecutionTrigger.MANUAL,
            status: WorkflowExecutionStatus.PENDING,
            definition: flowDefinition,
            startedAt: new Date(),
            phases: {
                create: executionPlan.flatMap((phase) => {
                    return phase.nodes.flatMap((node) => {
                        return{
                            userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label
                        }
                    })
                })
            }
        },
        select:{
            id: true,
            phases: true
        }
    })
    if(!execution) {
        throw new Error("workflow execution not created")
    }

    ExecuteWorkflow(execution.id); //run this in the background
    redirect(`/workflow/runs/${workflowId}/${execution.id}`)
    
}