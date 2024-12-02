import React from 'react'
import { Loader2Icon } from 'lucide-react'
function loading() {
  return (
    <div className='h-screen flex justify-center w-full items-center'>
        <Loader2Icon className='animate-spin stroke-primary' size={30}/>
    </div>
  )
}

export default loading