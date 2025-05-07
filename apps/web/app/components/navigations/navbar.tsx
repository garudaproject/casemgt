import {
	BellIcon,
	BoxIcon,
	LogOutIcon,
	MailIcon,
	MessageSquareIcon,
	PanelLeftIcon,
	PlusCircleIcon,
	SearchIcon,
} from 'lucide-react'
import { Link } from 'react-router'
import { APP_NAME } from '~/consts'
import { useAuth } from '~/context/auth-context'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { useSidebar } from '../ui/sidebar'

export default function Navbar() {
	const { auth, logout } = useAuth()
	const { toggleSidebar, open, isMobile } = useSidebar()

	return (
		<nav className="sticky top-0 z-10 border-b bg-background">
			<div className="flex items-center justify-between gap-3 p-2">
				<div className="flex items-center gap-3">
					<Button size="sm" variant="outline" onClick={toggleSidebar}>
						<PanelLeftIcon />
					</Button>
					{(isMobile || !open) && (
						<div className="flex rounded-md bg-secondary px-3 py-1.5">
							<Link
								to="/"
								className="flex items-center gap-2 font-bold text-xl"
							>
								<BoxIcon />
								<span>{APP_NAME}</span>
							</Link>
						</div>
					)}
					{!isMobile && (
						<div className="relative">
							<SearchIcon className="absolute top-2.5 left-3.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								className="pl-10"
								placeholder="Search here ..."
							/>
						</div>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								<PlusCircleIcon /> New
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="bottom" align="start">
							<DropdownMenuItem asChild>
								<Link to="/cases/new">New case</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link to="/jobs/new">New job</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link to="/clients/new">New client</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="flex items-center gap-3">
					<Button size="icon" variant="ghost" className="relative" asChild>
						<Link to="/notifications">
							<BellIcon />
							<span className="absolute top-0 right-0 hidden rounded-full bg-secondary px-1 font-bold text-[9px]">
								1
							</span>
						</Link>
					</Button>
					<Button size="icon" variant="ghost" className="relative" asChild>
						<Link to="/chats">
							<MessageSquareIcon />
							<span className="absolute top-0 right-0 hidden rounded-full bg-secondary px-1 font-bold text-[9px]">
								1
							</span>
						</Link>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="outline" className="rounded-full">
								<Avatar>
									<AvatarFallback>MG</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side="bottom"
							align="end"
							className="min-w-[150px]"
						>
							<DropdownMenuGroup>
								<DropdownMenuLabel className="font-bold text-md">
									{auth?.name}
								</DropdownMenuLabel>
								<DropdownMenuLabel className="flex items-center gap-2 py-0">
									<MailIcon className="h-4 w-4" />
									{auth?.email}
								</DropdownMenuLabel>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link to="/account">Account</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout}>
								<LogOutIcon />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	)
}
