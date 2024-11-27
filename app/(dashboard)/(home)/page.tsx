/**
 * Home Page
 * This is the main dashboard home page component.
 * It serves as the landing page for authenticated users.
 */
import React from 'react'

function HomePage() {
  return (
    // Main container for the home page content
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-bold'>
        Welcome to MorphAI Dashboard
      </h1>
      
      {/* Add your dashboard content here */}
      <div>
        {/* Dashboard widgets and components will go here */}
      </div>
    </div>
  )
}

export default HomePage
