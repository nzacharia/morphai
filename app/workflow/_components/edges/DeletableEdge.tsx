"use client"

import React from "react"
import { EdgeProps, BaseEdge ,getSmoothStepPath, EdgeLabelRenderer, useReactFlow} from "@xyflow/react"
import { Button } from "../../../../components/ui/button"


export default function DeletableEdge(props:EdgeProps){
const [edgePath, labelX, labelY] = getSmoothStepPath(props) 
const {setEdges} = useReactFlow()
    return (
    <>
    <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style}/>
    <EdgeLabelRenderer>
        <div style={{position:"absolute",transform:`translate(-50%,-50%) translate(${labelX}px,${labelY}px)`, pointerEvents:"auto"}}>
           <Button variant="outline" size="icon"  
           className="w-7 h-7 border cursor-pointer rounded-full text-sm leading-none hover:shadow-lg"
           onClick={()=>setEdges((eds)=>eds.filter((ed)=>ed.id !== props.id))}
           >
            x
           </Button>
        </div>
    </EdgeLabelRenderer>
    </>
    )
}