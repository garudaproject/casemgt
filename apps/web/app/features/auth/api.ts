import { AxiosApi } from '~/lib/axios'
import type { TLogin, TRegister } from '~/types'

class ApiAuth extends AxiosApi {
	constructor() {
		super('/api/auth')
		this.config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
	}

	async login(data: TLogin) {
		return this.axios.post('/login', data, this.config)
	}

	async register(data: TRegister) {
		return this.axios.post('/register', data, this.config)
	}

	async profile() {
		return this.axios.get('/profile')
	}

	async logout() {
		return this.axios.delete('/logout')
	}
}

export default new ApiAuth()
