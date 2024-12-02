import { CodeIcon, LucideProps } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const PageToHtmlTask =  {
    type:TaskType.PAGE_TO_HTML,
    label:"Get html from page",
    icon:(props:LucideProps)=>(<CodeIcon className="stroke-rose-500" {...props}/>),
    credits:2,
    isEntryPoint:false,
    inputs:[{
        name: "Web Page",
        type: TaskParamType.BROWSER_INSTANCE,
        required:true,
    }],
    outputs:[{
        name: "Html",
        type: TaskParamType.STRING,
    },
    {
        name: "Web Page",
        type: TaskParamType.BROWSER_INSTANCE,
    }
    ]
} satisfies WorkflowTask