'use client'
import React from 'react'
import { cn } from '../../../../lib/utils'
import { useReactFlow } from '@xyflow/react'
import useFlowValidation from '../../../../components/hooks/useFlowValidation'

function NodeCard({children,nodeId,isSelected}:{
    children:React.ReactNode,
    nodeId:string,
    isSelected:boolean
}) {
    const {getNode,setCenter} = useReactFlow();
    const {invalidInputs} = useFlowValidation();
    const hasInvalidInputs = invalidInputs.some(node => node.nodeId === nodeId)
    
  return (
    <div 
    onDoubleClick={()=>{
        const node = getNode(nodeId);
        if(!node) return;
        const {position,measured} = node;
        if(!measured || !position) return;
        const {width,height} = measured;
        const x = position.x + width!/2;
        const y = position.y + height!/2;
        console.log(x,y)
        if(x === undefined || y === undefined) return;
        setCenter(x,y, {zoom:1,duration:500});
    }}
    
    className={cn(
    "rounded-md cursor-pointer bg-background border-2 border-separate-[420px] w-[420px] text-xs gap-1 flex flex-col",
     isSelected && "border-primary",
     hasInvalidInputs && "border-destructive border-2"
     )}>
        {children}
    </div>
  )
}

export default NodeCard