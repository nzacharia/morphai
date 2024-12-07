import { TextIcon, LucideProps, MousePointerClick, SendIcon } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const DeliverViaWebhookTask =  {
    type:TaskType.DELIVER_VIA_WEBHOOK,
    label:"Deliver via webhook",
    icon:(props)=>(<SendIcon className="stroke-blue-500" {...props}/>),
    credits:1,
    isEntryPoint:false,
    inputs:[{
        name:"Target URL",
        type:TaskParamType.STRING,
        required:true,
    },

    {
        name: "Body",
        type: TaskParamType.STRING,
        required:true,
    }] as const,
    outputs:[
    ] as const,
} satisfies WorkflowTask