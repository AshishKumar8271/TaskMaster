import { Check, LogOut, User } from 'lucide-react'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip'
import { useAuthContext } from '@/context/AuthContext'

interface HeaderProps {
    handleSignInClick: () => void,
    handleSignUpClick: () => void,
}

const Header = ({handleSignInClick, handleSignUpClick}: HeaderProps) => {
    const { isAuthenticated, user, logout } = useAuthContext();

    return (
        <>
            <header className="shadow-sm border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">
                                <Check className="w-4 h-4 text-white dark:text-black" />
                            </div>
                            <h1 className="text-xl font-bold ">TaskMaster</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>
                                        <ModeToggle />
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Toggle theme
                                </TooltipContent>
                            </Tooltip>
                            {isAuthenticated && user ? (
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <span className="text-sm font-medium ">{user.username}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={logout}
                                    >
                                        <LogOut className="w-4 h-4 mr-1" />
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Button variant="ghost" onClick={handleSignInClick}>
                                        Sign In
                                    </Button>
                                    <Button onClick={handleSignUpClick}>
                                        Sign Up
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header