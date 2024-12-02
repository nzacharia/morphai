import React from 'react'
import { auth } from '@clerk/nextjs/server'
import prisma from '../../../../lib/prisma'
import Editor from '../../_components/Editor'

async function page({params}:{params:{workflowId:string}}) {
    const {workflowId} = params
    const {userId} = auth()
    if(!userId) return null

    const workflow = await prisma.workflow.findUnique({
        where:{
            id:workflowId,
            userId
        }
    })
    if(!workflow) return null
  return (
    <Editor workflow={workflow}/>
  )
}

export default page