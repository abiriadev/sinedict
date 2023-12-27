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

// I need Rust enum. fuck typescript.
type ArticlesStatus = 'loading' | 'success' | 'fail'

function App() {
	const [articlesStatus, setArticlesStatus] =
		useState<ArticlesStatus>('loading')
	const [articles, setArticles] = useState<
		Array<ArticleData>
	>([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(
		() =>
			void (async () => {
				try {
					setArticles(await fetchAll())
					setArticlesStatus('success')
				} catch (err) {
					console.error(err)
					setArticlesStatus('fail')
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
						{articlesStatus === 'loading' ? (
							<Flex
								vertical
								justify="center"
								className="h-full"
							>
								<Spin size="large" />
							</Flex>
						) : articlesStatus === 'success' ? (
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
						) : (
							<>Failed.</>
						)}
					</Flex>
				</Content>
				<Footer className="h-40"></Footer>
			</Layout>
		</ConfigProvider>
	)
}

export default App
