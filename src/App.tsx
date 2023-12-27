import { useEffect, useState } from 'react'
import { Button, ConfigProvider, Flex, Layout } from 'antd'
import { ArticleData } from './interface'
import { Article } from './Article'
import { Content, Footer } from 'antd/es/layout/layout'
import { PlusOutlined } from '@ant-design/icons'
import { NewArticle } from './NewArticle'
import { AppBar } from './AppBar'
import { supabase } from './supabase'

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
	const [articles, setArticles] = useState<
		Array<ArticleData>
	>([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(
		() =>
			void (async () => {
				try {
					const { data, error } = await supabase
						.from('articles')
						.select()

					if (error) throw error

					setArticles(data)
				} catch (err) {
					console.error(err)
				}
			})(),
		[],
	)

	return (
		<ConfigProvider
			theme={{
				components: {
					Layout: {
						headerBg: 'inherit',
						bodyBg: 'inherit',
						footerBg: 'inherit',
					},
				},
			}}
		>
			<Layout>
				<AppBar />
				<Content>
					<Flex justify="center">
						<Flex
							vertical
							gap="large"
							className="max-w-lg w-full"
						>
							<Button
								icon={<PlusOutlined />}
								type="dashed"
								onClick={() =>
									setIsModalOpen(true)
								}
							>
								Add new
							</Button>
							<NewArticle
								open={isModalOpen}
								onOk={() =>
									setIsModalOpen(false)
								}
								onCancel={() =>
									setIsModalOpen(false)
								}
							/>
							{articles.map(ad => (
								<Article {...ad} />
							))}
						</Flex>
					</Flex>
				</Content>
				<Footer className="h-40"></Footer>
			</Layout>
		</ConfigProvider>
	)
}

export default App
