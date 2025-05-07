import {
	CalendarIcon,
	DollarSignIcon,
	PaperclipIcon,
	ShoppingBagIcon,
	User2Icon,
} from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import MainLayout from '~/components/layouts/main-layout'
import { Alert, AlertTitle } from '~/components/ui/alert'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from '~/components/ui/breadcrumb'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '~/components/ui/chart'
import { APP_DESCRIPTION, APP_NAME } from '~/consts'
import type { Route } from './+types/overview'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: `Overview - ${APP_NAME}` },
		{ name: 'description', content: APP_DESCRIPTION },
	]
}

const items = [
	{
		title: 'Revenue',
		value: 0,
		type: 'currency',
		icon: <DollarSignIcon className="h-5 w-5 text-muted-foreground" />,
	},
	{
		title: 'Cases',
		value: 0,
		type: 'decimal',
		icon: <PaperclipIcon className="h-5 w-5 text-muted-foreground" />,
	},
	{
		title: 'Jobs',
		value: 0,
		type: 'decimal',
		icon: <ShoppingBagIcon className="h-5 w-5 text-muted-foreground" />,
	},
	{
		title: 'Clients',
		value: 0,
		type: 'decimal',
		icon: <User2Icon className="h-5 w-5 text-muted-foreground" />,
	},
]

const chartData = [
	{ month: 'January', revenue: 186, cases: 8 },
	{ month: 'February', revenue: 305, cases: 20 },
	{ month: 'March', revenue: 237, cases: 12 },
	{ month: 'April', revenue: 73, cases: 19 },
	{ month: 'May', revenue: 209, cases: 13 },
	{ month: 'June', revenue: 0, cases: 0 },
	{ month: 'July', revenue: 0, cases: 0 },
	{ month: 'August', revenue: 0, cases: 0 },
	{ month: 'September', revenue: 0, cases: 0 },
	{ month: 'October', revenue: 0, cases: 0 },
	{ month: 'November', revenue: 0, cases: 0 },
	{ month: 'December', revenue: 0, cases: 0 },
]

const chartConfig = {
	revenue: {
		label: 'Revenue',
		color: 'var(--chart-2)',
	},
	cases: {
		label: 'Cases',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig

function numberFormat(num: number) {
	return Intl.NumberFormat('en-en', {
		currency: 'USD',
		style: 'currency',
		maximumFractionDigits: 2,
	}).format(num)
}

export default function Overview() {
	return (
		<MainLayout>
			<div className="flex items-center justify-between">
				<Breadcrumb>
					<BreadcrumbList className="text-xl">
						<BreadcrumbItem>
							<BreadcrumbPage className="font-bold">Overview</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div>
					<Button size="sm" variant="outline" className="text-xs">
						<CalendarIcon /> This month
					</Button>
				</div>
			</div>
			<div className="grid gap-3 xl:grid-cols-4">
				{items.map((item, index) => (
					<Card key={index} className="bg-background">
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle>{item.title}</CardTitle>
							{item.icon}
						</CardHeader>
						<CardContent>
							<b className="font-bold text-xl">
								{item.type === 'currency'
									? `${numberFormat(item.value)}`
									: item.value}
							</b>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="grid gap-3 md:grid-cols-3">
				<Card className="bg-background md:col-span-2">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Total revenue</CardTitle>
						<div>
							<Button size="sm" variant="outline" className="text-xs">
								<CalendarIcon /> This year
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig}>
							<BarChart
								accessibilityLayer
								data={chartData}
								margin={{
									left: 12,
									right: 12,
								}}
							>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<ChartTooltip
									content={
										<ChartTooltipContent
											formatter={(value, name) => (
												<div className="flex min-w-[130px] items-center gap-2 text-muted-foreground text-xs">
													<div
														style={
															{
																'--color-bg': `var(--color-${name})`,
															} as React.CSSProperties
														}
														className={
															'h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]'
														}
													/>
													<span>
														{chartConfig[name as keyof typeof chartConfig]
															?.label || name}
													</span>
													<div className="ml-auto flex items-baseline gap-0.5 font-medium font-mono text-foreground tabular-nums">
														{name === 'revenue'
															? `${numberFormat(value as number)}`
															: value}
													</div>
												</div>
											)}
										/>
									}
									cursor={false}
									defaultIndex={1}
								/>
								<Bar
									dataKey="cases"
									stackId="a"
									fill="var(--color-cases)"
									radius={[0, 0, 4, 4]}
								/>
								<Bar
									dataKey="revenue"
									stackId="a"
									fill="var(--color-revenue)"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
				<div className="space-y-3">
					<Card className="bg-background">
						<CardHeader>
							<CardTitle>New cases</CardTitle>
						</CardHeader>
						<CardContent>
							<Alert className="text-center">
								<AlertTitle className="text-xs">Not available</AlertTitle>
							</Alert>
						</CardContent>
					</Card>
					<Card className="bg-background">
						<CardHeader>
							<CardTitle>New jobs</CardTitle>
						</CardHeader>
						<CardContent>
							<Alert className="text-center">
								<AlertTitle className="text-xs">Not available</AlertTitle>
							</Alert>
						</CardContent>
					</Card>
				</div>
			</div>
		</MainLayout>
	)
}
