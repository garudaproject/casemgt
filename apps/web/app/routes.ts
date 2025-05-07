import {
	type RouteConfig,
	index,
	prefix,
	route,
} from '@react-router/dev/routes'

export default [
	index('routes/overview.tsx'),
	...prefix('auth', [
		route('login', 'routes/auth/login.tsx'),
		route('register', 'routes/auth/register.tsx'),
	]),
] satisfies RouteConfig
