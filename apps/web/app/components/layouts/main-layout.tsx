import type React from 'react'
import { Navigate } from 'react-router'
import { useAuthStore } from '~/stores/auth-store'
import Navbar from '../navigations/navbar'
import SidebarLeft from '../navigations/sidebar-left'
import { SidebarProvider } from '../ui/sidebar'

export default function MainLayout({ children }: React.PropsWithChildren) {
	const { auth } = useAuthStore()

	if (!auth) return <Navigate to="/auth/login" />

	return (
		<SidebarProvider className="flex h-screen overflow-hidden">
			<SidebarLeft />
			<div className="flex flex-1 flex-col overflow-auto">
				<Navbar />
				<div className="flex-1 space-y-3 p-3">{children}</div>
			</div>
		</SidebarProvider>
	)
}
