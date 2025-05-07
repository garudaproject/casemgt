import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useFetcher } from 'react-router'
import { z } from 'zod'
import AlertMessage from '~/components/alert-message'
import AuthLayout from '~/components/layouts/auth-layout'
import { Button } from '~/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { APP_DESCRIPTION, APP_NAME } from '~/consts'
import { useAuth } from '~/context/auth-context'
import api from '~/features/auth/api'
import type { Route } from './+types/login'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: `Login - ${APP_NAME}` },
		{ name: 'description', content: APP_DESCRIPTION },
	]
}

export async function clientAction({ request }: Route.ClientActionArgs) {
	try {
		const body = await request.json()
		const { data } = await api.login(body)
		return { ...data }
	} catch (err: any) {
		if (isAxiosError(err)) {
			console.log(err.response?.data)
		}
		return {
			error: {
				message: isAxiosError(err) ? err.response?.data.message : err.message,
			},
		}
	}
}

const Schema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(8),
})

export default function Login() {
	const { profile } = useAuth()
	const fetcher = useFetcher()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(Schema),
	})

	function onSubmit(form: z.infer<typeof Schema>) {
		fetcher.submit(form, {
			method: 'POST',
			encType: 'application/json',
		})
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (fetcher.data?.error) return
		profile()
	}, [fetcher.data])

	return (
		<AuthLayout>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>
						Enter form below to start accessing.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{fetcher.state !== 'submitting' && (
							<AlertMessage data={fetcher.data} />
						)}
						<div className="space-y-1">
							<Label className="text-xs">Email</Label>
							<Input {...register('email')} type="email" />
							{errors.email && (
								<small className="text-red-500 text-xs">
									{errors.email?.message}
								</small>
							)}
						</div>
						<div className="space-y-1">
							<Label className="text-xs">Password</Label>
							<Input {...register('password')} type="password" />
							{errors.password && (
								<small className="text-red-500 text-xs">
									{errors.password?.message}
								</small>
							)}
						</div>
						<div className="hidden">
							<Link
								to="/auth/forget-password"
								className="font-medium text-sm hover:underline"
							>
								Forget password
							</Link>
						</div>
						<div>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</div>
						<div className="flex gap-1 text-sm">
							Don't have an account?
							<Link to="/auth/register" className="font-medium hover:underline">
								Register
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</AuthLayout>
	)
}
