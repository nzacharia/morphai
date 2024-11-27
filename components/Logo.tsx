/**
 * Logo Component
 * This component creates a consistent brand logo with a gradient effect
 * and an icon. It's used across the application for branding purposes.
 */
import { cn } from '@/lib/utils'
import { SquareDashedMousePointerIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Logo({
    // Default font size for the logo text
    fontSize = 'text-2xl',
    // Default size for the icon
    iconSize = 20
}: {
    fontSize?: string,
    iconSize?: number
}) {
  return <Link href="/" className={cn(
    // Base styles for the logo container
    "text-2xl font-extrabold flex items-center gap-2",
    fontSize
  )}>
    {/* Icon container with gradient background */}
    <div className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 p-2">
        <SquareDashedMousePointerIcon size={iconSize} className="stroke-white" />
    </div>
    {/* Text part of the logo with gradient effect */}
    <div>
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