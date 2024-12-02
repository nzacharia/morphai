import { memo } from "react";
import { TaskRegistry } from "../../../../lib/workflow/task/registry";
import { NodeProps } from "@xyflow/react";
import NodeCard from "./NodeCard";
import React from "react";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "../../../../types/appNode";
import { NodeInputs, NodeInput } from "./NodeInputs";
import { NodeOutputs, NodeOutput } from "./NodeOutputs";

const NodeComponent = memo((props:NodeProps)=>{
const nodeData = props.data as AppNodeData;
const task = TaskRegistry[nodeData.type];
    return <NodeCard nodeId={props.id} isSelected={!!props.selected}>
        <NodeHeader taskType={nodeData.type} nodeId={props.id}/>
        <NodeInputs>
            {task.inputs.map((input)=>(
                <NodeInput key={input.name} input={input} nodeId={props.id}/>
            ))}
        </NodeInputs>
        <NodeOutputs>
            {task.outputs.map((output)=>(
                <NodeOutput key={output.name} output={output} />
            ))}
        </NodeOutputs>
    </NodeCard>
})

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";