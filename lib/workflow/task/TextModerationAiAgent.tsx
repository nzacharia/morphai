import { TextIcon, LucideProps, MousePointerClick, Brain } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const TextModerationAiAgentTask =  {
    type:TaskType.TEXT_MODERATION_AI_AGENT,
    label:"Text moderation AI agent",
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
    }
] as const,
    outputs:[{
        name: "Extracted data",
        type: TaskParamType.STRING,
    }
    ] as const,
} satisfies WorkflowTask