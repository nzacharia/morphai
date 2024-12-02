import { LucideProps } from "lucide-react"
import { TaskType, TaskParam } from "./task"

export enum WorkflowStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
}

export type WorkflowTask = {
    type:TaskType,
    label:string,
    icon:React.FC<LucideProps>
    isEntryPoint?:boolean
    inputs: TaskParam[]
    outputs: TaskParam[]
    credits:number
}