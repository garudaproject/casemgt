import { create } from 'zustand'

export type AuthState = {
	auth: any
	setAuth: (v: any) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	auth: null,
	setAuth: (v) => set(() => ({ auth: v })),
}))
