import { TextIcon, LucideProps, MousePointerClick, FileJson2Icon, DatabaseIcon } from "lucide-react";
import { TaskType } from "../../../types/task";
import React from "react";
import { TaskParamType } from "../../../types/task";
import { WorkflowTask } from "../../../types/workflow";
export const AddPropertyToJsonTask =  {
    type:TaskType.ADD_PROPERTY_TO_JSON,
    label:"Add property to JSON",
    icon:(props)=>(<DatabaseIcon className="stroke-orange-500" {...props}/>),
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
    },
    {
        name: "Property value",
        type: TaskParamType.STRING,
        required:true,
    }
] as const,
    outputs:[{
        name: "Updated JSON",
        type: TaskParamType.STRING,
    }
    ] as const,
} satisfies WorkflowTask