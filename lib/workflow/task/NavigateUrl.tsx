import { TextIcon, LucideProps, MousePointerClick, Link2Icon } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const NavigateUrlTask =  {
    type:TaskType.NAVIGATE_URL,
    label:"Navigate to URL",
    icon:(props)=>(<Link2Icon className="stroke-orange-500" {...props}/>),
    credits:2,
    isEntryPoint:false,
    inputs:[{
        name:"Web page",
        type:TaskParamType.BROWSER_INSTANCE,
        required:true,
    },

    {
        name: "URL",
        type: TaskParamType.STRING,
        required:true,
    }] as const,
    outputs:[{
        name: "Web page",
        type: TaskParamType.BROWSER_INSTANCE,
    }
    ] as const,
} satisfies WorkflowTask