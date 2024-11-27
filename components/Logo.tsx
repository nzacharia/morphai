import { cn } from '@/lib/utils'
import { Brain } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Logo({
    fontSize = 'text-4xl' ,
    iconSize =  20
}:{ 
    fontSize?: string, 
    iconSize?: number
}) {
  return <Link href="/" className={cn(
    "text-2xl font-extrabold flex items-center gap-2",
    fontSize
) }>
    <div className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 p-2">
        <Brain size={iconSize} className="stroke-white" />
    </div>
    <div >
        <span className='bg-gradient-to-r from-blue-400 to-blue-600
            bg-clip-text text-transparent'>
            morph
        </span>
        <span className='text-stone-700 dark:text-stone-300'>
            ai</span>
    </div>
</Link>
}

export default Logo