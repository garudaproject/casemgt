import { useMutation, useQuery } from '@tanstack/react-query'
import { LockIcon } from 'lucide-react'
import type React from 'react'
import { createContext, useContext } from 'react'
import { Badge } from '~/components/ui/badge'
import api from '~/features/auth/api'
import { type AuthState, useAuthStore } from '~/stores/auth-store'

type State = {
	profile: () => void
	logout: () => void
}

export const AuthContext = createContext<State & AuthState>({
	auth: null,
	setAuth: () => {},
	profile: () => {},
	logout: () => {},
})

export default function AuthProvider({ children }: React.PropsWithChildren) {
	const { auth, setAuth } = useAuthStore()
	const { isLoading, refetch: profile } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			try {
				const { data } = await api.profile()
				setAuth(data.data)
				return data
			} catch (err) {
				return null
			}
		},
	})
	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: async () => {
			try {
				await api.logout()
				setAuth(null)
				return null
			} catch (err) {
				return null
			}
		},
	})

	const value = { auth, setAuth, profile, logout }

	if (isLoading)
		return (
			<div className="absolute right-5 bottom-5">
				<Badge variant="secondary" className="animate-pulse">
					<LockIcon /> Authenticating..
				</Badge>
			</div>
		)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
