'use client'
import React, { useEffect,useCallback } from 'react'
import { Workflow } from '@prisma/client'
import { ReactFlowProvider, ReactFlow, useNodesState, useEdgesState, addEdge, Controls, Background, BackgroundVariant } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import { CreateFlowNode } from '../../../lib/workflow/createFlowNode'
import { TaskType } from '../../../types/task'
import NodeComponent from './nodes/NodeComponent'
import { useReactFlow, Connection, Edge, MarkerType, getOutgoers } from '@xyflow/react'
import { AppNode } from '../../../types/appNode'
import DeletableEdge from './edges/DeletableEdge'
import { TaskRegistry } from '../../../lib/workflow/task/registry'
const nodeTypes = {
    MorphNode:NodeComponent,
}

const edgeTypes = {
    default:DeletableEdge,
}
const snapGrid: [number,number] = [60,60];
const fitViewOptions = {
    padding:1,
}
function FlowEditor({workflow}:{workflow:Workflow}) {
    const [nodes,setNodes, onNodesChange] = useNodesState<AppNode>([])
    const [edges,setEdges, onEdgesChange] = useEdgesState<Edge>([])
    const {setViewport,screenToFlowPosition,updateNodeData} = useReactFlow()

    useEffect(()=>{
        try{
            const flow = JSON.parse(workflow.definition)
            if(!flow) return
            setNodes(flow.nodes || [])
            setEdges(flow.edges || [])
            if (!flow.viewport) return;
            const {x=0,y=0,zoom=1} = flow.viewport
            setViewport({x,y,zoom})
        }catch(e){
            console.error(e)
        }
    },[workflow.definition,setNodes,setEdges,setViewport])

    const onDragOver = useCallback((event:React.DragEvent)=>{
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
    },[])

    const onDrop = useCallback((event:React.DragEvent)=>{
        event.preventDefault()
        const taskType = event.dataTransfer.getData("application/reactflow")
        if(!taskType || typeof taskType === 'undefined') return
        const position = screenToFlowPosition(
            {
                x:event.clientX,
                y:event.clientY
            }
            
        )
        const newNode = CreateFlowNode(taskType as TaskType,position)
        setNodes((nds) => nds.concat(newNode))
    },[screenToFlowPosition,setNodes])

    const onConnect = useCallback((connection: Connection)=>{


        setEdges((eds) => addEdge({
            ...connection, 
            animated: true,
            markerEnd: { type: MarkerType.Arrow },
            style:{strokeWidth:4}
        }, eds))
        if(!connection.targetHandle) return
        const node = nodes.find((nd)=>nd.id === connection.target)
        if(!node) return
        const nodeInputs = node.data.inputs
        updateNodeData(node.id,{
            inputs:{
                ...nodeInputs,
                [connection.targetHandle]: ""
            }
        })

    },[setEdges,updateNodeData,nodes])

    const isValidConnection = useCallback((connection:Edge |Connection)=>{
       //No Self Connection allowed
       if(connection.source === connection.target) return false
       //Same taskParam type connection
       const source = nodes.find((nd)=>nd.id === connection.source)
       const target = nodes.find((nd)=>nd.id === connection.target)
        if(!source || !target) return false

        const sourceTask = TaskRegistry[source.data.type]
        const targetTask = TaskRegistry[target.data.type]

        const output = sourceTask.outputs.find((p)=>p.name === connection.sourceHandle)

        const input = targetTask.inputs.find((p)=>p.name === connection.targetHandle)

        if(input?.type !== output?.type) return false
        //Check for cycle
        const hasCycle = (node:AppNode, visited = new Set())=>{
            if(visited.has(node.id)) return true
            visited.add(node.id)
            for(const outgoer of getOutgoers(node,nodes,edges)){
                if(outgoer.id === connection.source) return true
                if(hasCycle(outgoer,visited)) return true
            }
        }

        const detectedCycle = hasCycle(target)
        return !detectedCycle
    },[nodes,edges])
  return (
    <main className='w-full h-full'>

        <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        >
<Controls position='top-left' fitViewOptions={fitViewOptions}/>
<Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
        </ReactFlow>
    </main>
  )
}

export default FlowEditor