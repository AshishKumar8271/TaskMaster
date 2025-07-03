import React from 'react'

const Title = ({children}: {children: React.ReactNode}) => {
  return (
    <span className='text-gray-900 dark:text-gray-100'>{children}</span>
  )
}

export default Title