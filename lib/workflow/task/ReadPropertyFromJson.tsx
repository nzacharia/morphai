import { TextIcon, LucideProps, MousePointerClick, FileJson2Icon } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const ReadPropertyFromJsonTask =  {
    type:TaskType.READ_PROPERTY_FROM_JSON,
    label:"Read property from JSON",
    icon:(props)=>(<FileJson2Icon className="stroke-orange-500" {...props}/>),
    credits:1,
    isEntryPoint:false,
    inputs:[{
        name:"JSON",
        type:TaskParamType.STRING,
        required:true,
    },

    {
        name: "Property name",
        type: TaskParamType.STRING,
        required:true,
    }] as const,
    outputs:[{
        name: "Property value",
        type: TaskParamType.STRING,
    }
    ] as const,
} satisfies WorkflowTask