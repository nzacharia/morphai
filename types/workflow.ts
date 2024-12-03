import { LucideProps } from "lucide-react"
import { TaskType, TaskParam } from "./task"
import { AppNode } from "./appNode"

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

export type WorkflowExecutionPlan = {
    phase: number;
    nodes: AppNode[]
}[]

export type WorkflowExecutionPlanPhase = {
    phase: number;
    nodes: AppNode[]
}

export enum WorkflowExecutionStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}

export enum ExecutionPhaseStatus {
    CREATED = "CREATED",
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}

export enum WorkflowExecutionTrigger {
    MANUAL = "MANUAL",
}