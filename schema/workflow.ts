import { z } from 'zod'

export const createWorkflowSchema = z.object({
    name: z.string().max(50),
    description: z.string().max(800).optional(),
})

export type CreateWorkflowSchemaType = z.infer<typeof createWorkflowSchema>