import {
	BoxIcon,
	Building2Icon,
	HomeIcon,
	MailsIcon,
	PaperclipIcon,
	SettingsIcon,
	ShoppingBagIcon,
	UserSquare2Icon,
	Users2Icon,
} from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { APP_NAME } from '~/consts'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '../ui/sidebar'

const menus = [
	{
		title: 'General',
		items: [
			{
				icon: <HomeIcon />,
				title: 'Overview',
				href: '/',
			},
			{
				icon: <PaperclipIcon />,
				title: 'Cases',
				href: '/cases',
			},
			{
				icon: <ShoppingBagIcon />,
				title: 'Jobs',
				href: '/jobs',
			},
			{
				icon: <Users2Icon />,
				title: 'Clients',
				href: '/clients',
			},
		],
	},
	{
		title: 'Internal',
		items: [
			{
				icon: <MailsIcon />,
				title: 'Letters',
				href: '/letters',
			},
			{
				icon: <Building2Icon />,
				title: 'Assets',
				href: '/assets',
			},
			{
				icon: <UserSquare2Icon />,
				title: 'Employees',
				href: '/employees',
			},
		],
	},
]

export default function SidebarLeft() {
	return (
		<Sidebar>
			<SidebarHeader>
				<div className="rounded-md bg-secondary px-3 py-1.5">
					<Link to="/" className="flex items-center gap-2 font-bold text-xl">
						<BoxIcon />
						<span>{APP_NAME}</span>
					</Link>
				</div>
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{menus.map((menu, index) => (
					<SidebarGroup key={index} className="space-y-1">
						<SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							{menu.items.map((item, idx) => (
								<SidebarMenu key={idx}>
									<SidebarMenuItem>
										<NavLink to={item.href}>
											{({ isActive }) => (
												<SidebarMenuButton isActive={isActive}>
													{item.icon}
													<span>{item.title}</span>
												</SidebarMenuButton>
											)}
										</NavLink>
									</SidebarMenuItem>
								</SidebarMenu>
							))}
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<div className="p-2">
				<NavLink to="/settings">
					{({ isActive }) => (
						<SidebarMenuButton isActive={isActive}>
							<SettingsIcon />
							<span>Settings</span>
						</SidebarMenuButton>
					)}
				</NavLink>
			</div>
		</Sidebar>
	)
}
