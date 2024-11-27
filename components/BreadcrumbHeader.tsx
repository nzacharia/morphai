/**
 * BreadcrumbHeader Component
 * This component creates a navigation breadcrumb that shows the current path
 * hierarchy, helping users understand their location in the application.
 */
'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from './ui/breadcrumb'

function BreadcrumbHeader() {
    // Get current path and split it into segments
    const pathName = usePathname()
    const paths = pathName === "/" ? [""] : pathName?.split("/")
    
  return (
    <div>
        <Breadcrumb>
            <BreadcrumbList>
                {/* Map through path segments to create breadcrumb items */}
                {paths.map((path,index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {/* Create clickable links for each segment */}
                            <BreadcrumbLink className='capitalize' href={`/${path}`}>
                                {path === "" ? "home" : path}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    </div>
  )
}

export default BreadcrumbHeader