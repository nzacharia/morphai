/**
 * Dashboard Layout
 * This is the main layout component for the dashboard section of the application.
 * It wraps all dashboard routes and provides consistent navigation and structure.
 */
import React from 'react'
import DesktopSidebar from '@/components/Sidebar'
import BreadcrumbHeader from '@/components/BreadcrumbHeader'

// Define the props type for the layout component
interface DashboardLayoutProps {
    children: React.ReactNode
}

function DashboardLayout({
    children
}: DashboardLayoutProps) {
    return (
        // Main dashboard container with grid layout
        <div className='h-screen relative'>
            <div className='flex h-full'>
                {/* Sidebar navigation */}
                <DesktopSidebar />
                
                {/* Main content area */}
                <main className='flex-1 h-full overflow-y-auto'>
                    {/* Top navigation with breadcrumbs */}
                    <div className='p-6 border-b'>
                        <BreadcrumbHeader />
                    </div>
                    
                    {/* Page content */}
                    <div className='p-6'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout