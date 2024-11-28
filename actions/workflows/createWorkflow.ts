"use server"
import { auth } from "@clerk/nextjs/server"
import { createWorkflowSchema, CreateWorkflowSchemaType } from "../../schema/workflow"
import prisma from "../../lib/prisma"
import { WorkflowStatus } from "../../types/workflow"
import { redirect } from "next/navigation"

export async function CreateWorkflow(form  : CreateWorkflowSchemaType) {
    const {success,data}  =  createWorkflowSchema.safeParse(form)
    if(!success)  throw new Error("Invalid form data")
    const {userId} = auth()
    if(!userId) throw new Error("User not authenticated")
    const result = await prisma.workflow.create({
        data: {
            userId: userId,
            status: WorkflowStatus.DRAFT,    
            definition: "TODO",
            ...data,
        }
    })
    if(!result) throw new Error("Failed to create workflow")

        redirect(`/workflow/editor/${result.id}`)
}
