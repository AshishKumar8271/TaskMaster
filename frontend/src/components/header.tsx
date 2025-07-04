import { Check } from 'lucide-react'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { useAuthContext } from '@/context/AuthContext'
import CustomTooltip from './custom-tooltip'
import UserMenu from './user-menu'

interface HeaderProps {
    handleSignInClick: () => void,
    handleSignUpClick: () => void,
}

const Header = ({ handleSignInClick, handleSignUpClick }: HeaderProps) => {
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

                        <div className="flex items-center space-x-2">
                            <CustomTooltip content='Toggle theme'>
                                <ModeToggle />
                            </CustomTooltip>
                            {isAuthenticated && user ? (
                                <UserMenu username={user.username} onLogout={logout} />
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" onClick={handleSignInClick}>
                                        Sign In
                                    </Button>
                                    <Button onClick={handleSignUpClick} className='hidden sm:block'>
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