import { TextIcon, LucideProps, MousePointerClick, EyeIcon } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const WaitForElementTask =  {
    type:TaskType.WAIT_FOR_ELEMENT,
    label:"Wait for element",
    icon:(props)=>(<EyeIcon className="stroke-amber-400" {...props}/>),
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
    },
    {
        name: "Visibility",
        type: TaskParamType.SELECT,
        hideHandle:true,
        required:true,
        options: [
            {label: "Visible", value: "visible"},
            {label: "Hidden", value: "hidden"}
        ]
    },
] as const,
    outputs:[{
        name: "Web page",
        type: TaskParamType.BROWSER_INSTANCE,
    }
    ] as const,
} satisfies WorkflowTask