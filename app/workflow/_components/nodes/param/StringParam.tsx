"use client"

import React, { useEffect, useState } from 'react'
import { Label } from '../../../../../components/ui/label'
import { useId } from 'react'
import { Input } from '../../../../../components/ui/input'
import { TaskParam } from '../../../../../types/task'
import { Textarea } from '../../../../../components/ui/textarea'
import { ParamProps } from '../../../../../types/appNode'

function StringParam({param , value, updateNodeParamValue, disabled}:ParamProps) {
    const[internalValue, setInternalValue] = useState(value)
    const id = useId()

    useEffect(()=>{
        setInternalValue(value)
    },[value])

    let Component: any = Input
    if(param.variant === "textarea"){
        Component = Textarea
    }

  return (
    <div className='space-y-1 p-1 w-full'>
         <Label htmlFor={id} className='text-xs flex'>
            {param.name}
            {param.required && <span className='text-red-400'>*</span>}
            </Label>
         <Component 
         className='text-xs'
         id={id} 
         value={internalValue} 
         placeholder="Enter a value"
         onChange={(e:any)=>setInternalValue(e.target.value)} 
         onBlur={(e:any)=>updateNodeParamValue(e.target.value)}
         disabled={disabled}
         />
         {param.helperText && (<p className='px-2 text-muted-foreground'>{param.helperText}</p>)}
    </div>
  )
}

export default StringParam