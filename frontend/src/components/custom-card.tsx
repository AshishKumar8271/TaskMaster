import React from 'react'

const CustomCard = ({ children, className="" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-white dark:bg-card rounded-xl shadow-sm border border-gray-200 dark:border-border ${className}`}>{children}</div>
  )
}

export default CustomCard