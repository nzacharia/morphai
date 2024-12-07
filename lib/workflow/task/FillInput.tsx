import { CodeIcon, Edit3Icon, LucideProps } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const FillInputTask =  {
    type:TaskType.FILL_INPUT,
    label:"Fill input",
    icon:(props)=>(<Edit3Icon className="stroke-orange-500" {...props}/>),
    credits:1,
    isEntryPoint:false,
    inputs:[{
        name: "Web Page",
        type: TaskParamType.BROWSER_INSTANCE,
        required:true,
    },
    {
        name: "Selector",
        type: TaskParamType.STRING,
        required:true,
    },
    {
        name: "Value",
        type: TaskParamType.STRING,
        required:true,
    }
] as const,
    outputs:[
    {
        name: "Web Page",
        type: TaskParamType.BROWSER_INSTANCE,
    }
    ] as const,
} satisfies WorkflowTask