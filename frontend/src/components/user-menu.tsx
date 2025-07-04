import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from './ui/dropdown-menu';
import CustomTooltip from './custom-tooltip';
import { Button } from './ui/button';

interface UserMenuProps {
    username: string;
    avatarUrl?: string;
    onLogout: () => void;
}

const UserMenu = ({ username, avatarUrl, onLogout }: UserMenuProps) => (
    <div className="flex items-center space-x-2">
        <div className='hidden sm:block'>
            <CustomTooltip content={username}>
                <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src={avatarUrl} alt={username} />
                    <AvatarFallback className='bg-gray-300 '>{username ? username[0].toUpperCase() : '?'}</AvatarFallback>
                </Avatar>
            </CustomTooltip>
        </div>
        <div className='block sm:hidden'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div>
                        <CustomTooltip content={username}>
                            <Avatar className="w-8 h-8 cursor-pointer">
                                <AvatarImage src={avatarUrl} alt={username} />
                                <AvatarFallback className='bg-gray-300 '>{username ? username[0].toUpperCase() : '?'}</AvatarFallback>
                            </Avatar>
                        </CustomTooltip>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="sm:hidden">
                    <DropdownMenuLabel>{username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 cursor-pointer">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <span className="hidden sm:block text-sm font-medium ">{username}</span>
        <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="hidden sm:flex"
        >
            <LogOut className="w-4 h-4 mr-1" />
            <span>Logout</span>
        </Button>
    </div>
);

export default UserMenu;
