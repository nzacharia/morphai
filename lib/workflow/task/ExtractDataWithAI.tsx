import { TextIcon, LucideProps, MousePointerClick, Brain } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const ExtractDataWithAITask =  {
    type:TaskType.EXTRACT_DATA_WITH_AI,
    label:"Extract data with AI",
    icon:(props)=>(<Brain className="stroke-rose-500" {...props}/>),
    credits:4,
    isEntryPoint:false,
    inputs:[{
        name:"Content",
        type:TaskParamType.STRING,
        required:true,
    },

    {
        name: "Credentials",
        type: TaskParamType.CREDENTIAL,
        required:true,
    },
    {
        name:"Prompt",
        type:TaskParamType.STRING,
        required:true,
        variant:"textarea"
    }
] as const,
    outputs:[{
        name: "Extracted data",
        type: TaskParamType.STRING,
    }
    ] as const,
} satisfies WorkflowTask