"use client"

import React from 'react'
import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from 'lucide-react'
import Logo from './Logo'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import UserAvailableCreditsBadge from './UserAvailableCreditsBadge'
const routes = [
    {
        label: "Home",
        icon: HomeIcon,
        href: ""
    },
    {
        label: "Workflows",
        icon: Layers2Icon,
        href: "workflows"
    },
    {
        label: "Credentials",
        icon: ShieldCheckIcon,
        href: "credentials"
    },
    {
        label: "Billing",
        icon: CoinsIcon,
        href: "billing"
    },
]

function DesktopSidebar() {
    const pathname = usePathname()
    const activeRoute = routes.find(
        (route) => route.href.length > 0 && pathname.includes 
        (route.href)) || routes[0]
    return (
        <div className='hidden relative md:block min-w-[280px] max-w-[280px] h-screen 
        overflow-hidden w-full bg-primary/5 dark:bg-primary/30 dark:text-foreground 
        text-muted-foreground border-r-2 border-separate'>
            <div className='flex items-center justify-center
            gap-2 border-b-[1px] border-separate'>
                <Logo />
            </div>
            <div className='p-2'>
                <UserAvailableCreditsBadge />

            </div>
                <div className='flex flex-col p2'>
                    {routes.map((route) => (
                    <Link key={route.href} href={`/${route.href}`}
                    className={
                        buttonVariants({
                            variant: activeRoute?.href === route.href ? "sidebarActive" : "sidebarItem",
                        })
                    }>
                        <route.icon size={20} />
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}


export function MobileSidebar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const activeRoute = routes.find(
        (route) => route.href.length > 0 && pathname.includes 
        (route.href)) || routes[0]
    
    return (
        <div className='block border-separate bg-background md:hidden' >
            <nav className='flex flex-col items-center justify-between px-8'>
<Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
            <MenuIcon />
        </Button>
    </SheetTrigger>
    <SheetContent side="left" className='w-[400px] sm:w-[540px] space-y-4'>
        <Logo />
        <UserAvailableCreditsBadge />
        <div className='flex flex-col gap-1'>
        {routes.map((route) => (
                    <Link key={route.href} href={route.href}
                    className={
                        buttonVariants({
                            variant: activeRoute?.href === route.href ? "sidebarActive" : "sidebarItem",
                        })
                    }
                    onClick={() => setOpen(prev => !prev)}
                    >
                        <route.icon size={20} />
                        {route.label}
                    </Link>
                ))}
        </div>
    </SheetContent>

</Sheet>
            </nav>
        </div>
    )
}
export default DesktopSidebar