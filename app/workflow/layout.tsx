import React from 'react'
import { Separator } from '../../components/ui/separator'
import Logo from '../../components/Logo'
import {ModeToggle} from '../../components/ThemeModeToggle'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col h-screen'>
        {children}
        <Separator/>
        <footer className='flex justify-between p-2 items-center'>
            <Logo iconSize={16} fontSize='text-xl'/>
            <ModeToggle/>
        </footer>
    </div>
  )
}

export default layout