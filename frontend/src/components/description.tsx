import React from 'react'

const Description = ({children}: {children: React.ReactNode}) => {
  return (
    <span className='block text-gray-600 dark:text-gray-300'>{children}</span>
  )
}

export default Description;