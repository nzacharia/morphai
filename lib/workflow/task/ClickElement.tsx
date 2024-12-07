import { TextIcon, LucideProps, MousePointerClick } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const ClickElementTask =  {
    type:TaskType.CLICK_ELEMENT,
    label:"Click element",
    icon:(props)=>(<MousePointerClick className="stroke-orange-500" {...props}/>),
    credits:1,
    isEntryPoint:false,
    inputs:[{
        name:"Web page",
        type:TaskParamType.BROWSER_INSTANCE,
        required:true,
    },

    {
        name: "Selector",
        type: TaskParamType.STRING,
        required:true,
    }] as const,
    outputs:[{
        name: "Web page",
        type: TaskParamType.BROWSER_INSTANCE,
    }
    ] as const,
} satisfies WorkflowTask