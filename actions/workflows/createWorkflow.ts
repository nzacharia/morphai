"use server"
import { auth } from "@clerk/nextjs/server"
import { createWorkflowSchema, CreateWorkflowSchemaType } from "../../schema/workflow"
import prisma from "../../lib/prisma"
import { WorkflowStatus } from "../../types/workflow"
import { redirect } from "next/navigation"
import { AppNode } from "../../types/appNode"
import { TaskType } from "@/types/task"
import { CreateFlowNode } from "../../lib/workflow/createFlowNode"
import { Edge } from "@xyflow/react"
export async function CreateWorkflow(form  : CreateWorkflowSchemaType) {
    const {success,data}  =  createWorkflowSchema.safeParse(form)
    if(!success)  throw new Error("Invalid form data")
    const {userId} = auth()
    if(!userId) throw new Error("User not authenticated")

    const initialFlow: {nodes: AppNode[],edges: Edge[]} = {nodes:[],edges:[]}
    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

    const result = await prisma.workflow.create({
        data: {
            userId: userId,
            status: WorkflowStatus.DRAFT,    
            definition: JSON.stringify(initialFlow),
            ...data,
        }
    })
    if(!result) throw new Error("Failed to create workflow")

        redirect(`/workflow/editor/${result.id}`)
}
