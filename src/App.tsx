import { useEffect, useState } from 'react'
import {
	Button,
	ConfigProvider,
	Flex,
	Layout,
	Spin,
} from 'antd'
import { ArticleData } from './interface'
import { Article } from './Article'
import { Content, Footer } from 'antd/es/layout/layout'
import { PlusOutlined } from '@ant-design/icons'
import { NewArticle } from './NewArticle'
import { AppBar } from './AppBar'
import { fetchAll } from './api'

function App() {
	const [isLoading, setIsLoading] = useState(true)
	const [articles, setArticles] = useState<
		Array<ArticleData>
	>([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(
		() =>
			void (async () => {
				try {
					setArticles(await fetchAll())
					setIsLoading(false)
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
			<Layout className="h-full">
				<AppBar />
				<Content>
					<Flex
						justify="center"
						className="h-full"
					>
						{isLoading ? (
							<Flex
								vertical
								justify="center"
								className="h-full"
							>
								<Spin size="large" />
							</Flex>
						) : (
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
									onOk={fields => (
										console.log(fields),
										setIsModalOpen(
											false,
										)
									)}
									onCancel={() =>
										setIsModalOpen(
											false,
										)
									}
								/>
								{articles.map(ad => (
									<Article {...ad} />
								))}
							</Flex>
						)}
					</Flex>
				</Content>
				<Footer className="h-40"></Footer>
			</Layout>
		</ConfigProvider>
	)
}

export default App
