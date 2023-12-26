import { useState } from 'react'
import { ConfigProvider, Flex, Layout, Space } from 'antd'
import { ArticleData } from './interface'
import { Article } from './Article'
import { Content, Header } from 'antd/es/layout/layout'

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
]

function App() {
	const [articles, _] = useState(data)

	return (
		<ConfigProvider
			theme={{
				components: {
					Layout: {
						headerBg: 'inherit',
						bodyBg: 'inherit',
					},
				},
			}}
		>
			<Layout>
				<Header
					style={{
						position: 'sticky',
						top: 0,
					}}
				>
					UpDict
				</Header>
				<Content>
					<Flex justify="center">
						<Flex
							vertical
							gap="large"
							style={{
								width: '100%',
								maxWidth: 500,
							}}
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
