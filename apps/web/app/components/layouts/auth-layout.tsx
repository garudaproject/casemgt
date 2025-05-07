import { BoxIcon } from 'lucide-react'
import type React from 'react'
import { Navigate } from 'react-router'
import { APP_NAME } from '~/consts'
import { useAuthStore } from '~/stores/auth-store'

export default function AuthLayout({ children }: React.PropsWithChildren) {
	const { auth } = useAuthStore()

	if (auth) return <Navigate to="/" />

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-10">
			<div className="rounded-md bg-secondary px-3 py-1.5">
				<h1 className="flex items-center gap-2 font-bold text-xl">
					<BoxIcon />
					{APP_NAME}
				</h1>
			</div>
			{children}
		</div>
	)
}
