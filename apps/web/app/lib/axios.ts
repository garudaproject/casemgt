import axios, { type Axios, type AxiosRequestConfig } from 'axios'

export class AxiosApi {
	protected axios: Axios
	protected config: AxiosRequestConfig

	constructor(baseUrl = '/api', config = {}) {
		this.config = config
		this.axios = axios.create()
		this.axios.interceptors.request.use((req) => {
			req.baseURL = baseUrl
			return req
		})
	}
}
