"use client"

import React from "react";

import { Handle, Position } from "@xyflow/react";
import { cn } from "../../../../lib/utils";
import { TaskParam } from "../../../../types/task";
import { ColorForHandle } from "./common";
export  function NodeOutputs({children}:{children:React.ReactNode}){
    return <div className="flex flex-col gap-1 divide-y">

            {children}

    </div>
}

export function NodeOutput({output}:{output:TaskParam}){
    return <div className="flex justify-end relative p-3 bg-secondary">
        <p className="text-xs text-muted-foreground">{output.name}</p>
        <Handle type="source" position={Position.Right} id={`${output.name}`} 
        className={cn("!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
            ColorForHandle[output.type]
        )}
        />
    </div>
}