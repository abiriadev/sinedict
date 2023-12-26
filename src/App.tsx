import { useState } from 'react'
import {
	Avatar,
	ConfigProvider,
	Dropdown,
	Flex,
	Layout,
	Typography,
} from 'antd'
import { ArticleData } from './interface'
import { Article } from './Article'
import { Content, Header } from 'antd/es/layout/layout'
import {
	GithubOutlined,
	LogoutOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { FaDiscord } from 'react-icons/fa'
import { ImTwitch } from 'react-icons/im'

const data: Array<ArticleData> = [
	{
		word: 'asdf',
		description: 'adfada',
		example: 'adfa',
		up: 10,
		down: 2,
	},
	{
		word: 'siba',
		description: 'sine bye',
		example: 'siba~',
		up: 5,
		down: 3,
	},
	{
		word: 'asdf',
		description: 'adfada',
		example: 'adfa',
		up: 10,
		down: 2,
	},
	{
		word: 'siba',
		description: 'sine bye',
		example: 'siba~',
		up: 5,
		down: 3,
	},
	{
		word: 'asdf',
		description: 'adfada',
		example: 'adfa',
		up: 10,
		down: 2,
	},
	{
		word: 'siba',
		description: 'sine bye',
		example: 'siba~',
		up: 5,
		down: 3,
	},
	{
		word: 'asdf',
		description: 'adfada',
		example: 'adfa',
		up: 10,
		down: 2,
	},
	{
		word: 'siba',
		description: 'sine bye',
		example: 'siba~',
		up: 5,
		down: 3,
	},
]

function App() {
	const [articles, _] = useState(data)

	return (
		<ConfigProvider
			theme={{
				token: {
					fontSizeHeading1: 34,
				},
				components: {
					Layout: {
						headerBg: 'inherit',
						bodyBg: 'inherit',
					},
					Typography: {
						titleMarginBottom: 0,
						titleMarginTop: 0,
					},
				},
			}}
		>
			<Layout>
				<Header className="sticky top-0 backdrop-blur-md">
					<Flex
						align="center"
						justify="space-between"
						className="h-full"
					>
						<Typography.Title level={1}>
							UpDict
						</Typography.Title>
						<Flex gap="large">
							<ImTwitch className="text-3xl" />
							<FaDiscord className="text-3xl" />
							<GithubOutlined className="text-3xl" />
							<Dropdown
								menu={{
									items: [
										{
											key: '1',
											label: 'Sign out',
											danger: true,
											icon: (
												<LogoutOutlined />
											),
										},
									],
								}}
							>
								<Avatar
									className="text-3xl"
									icon={<UserOutlined />}
								/>
							</Dropdown>
						</Flex>
					</Flex>
				</Header>
				<Content>
					<Flex justify="center">
						<Flex
							vertical
							gap="large"
							className="max-w-lg w-full"
						>
							{articles.map(ad => (
								<Article {...ad} />
							))}
						</Flex>
					</Flex>
				</Content>
			</Layout>
		</ConfigProvider>
	)
}

export default App
