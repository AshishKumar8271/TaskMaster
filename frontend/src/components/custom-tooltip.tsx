import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip'
import React from 'react'

const CustomTooltip = ({ children, content }: { children: React.ReactNode, content: string }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span>
                    {children}
                </span>
            </TooltipTrigger>
            <TooltipContent>
                {content}
            </TooltipContent>
        </Tooltip>
    )
}

export default CustomTooltip