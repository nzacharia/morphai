import { GlobeIcon, LucideProps } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const LaunchBrowserTask =  {
    type:TaskType.LAUNCH_BROWSER,
    label:"Launch Browser",
    icon:(props:LucideProps)=>(<GlobeIcon className="stroke-pink-500" {...props}/>),
    isEntryPoint:true,
    credits:5,
    inputs:[{
        name: "Website URL",
        type: TaskParamType.STRING,
        helperText:"e.g. https://www.google.com",
        required:true,
        hideHandle:true,
    }] as const,
    outputs:[{
        name: "Web Page",
        type: TaskParamType.BROWSER_INSTANCE,
    }] as const,
} satisfies WorkflowTask