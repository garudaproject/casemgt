import { CheckCircleIcon, XCircleIcon } from 'lucide-react'
import { Alert, AlertTitle } from './ui/alert'

type Props = {
	data: {
		error: any
		message: string
	}
}

export default function AlertMessage({ data }: Props) {
	if (data?.error)
		return (
			<Alert variant="destructive" className="bg-red-500/20">
				<XCircleIcon />
				<AlertTitle>{data.error.message}</AlertTitle>
			</Alert>
		)
	if (data?.message)
		return (
			<Alert className="bg-green-500/20 text-green-500">
				<CheckCircleIcon />
				<AlertTitle>{data.message}</AlertTitle>
			</Alert>
		)
	return <></>
}
