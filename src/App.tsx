import { useEffect, useState } from 'react'
import {
	Button,
	ConfigProvider,
	Flex,
	Layout,
	Result,
	Spin,
} from 'antd'
import { ArticleData } from './interface'
import { Article } from './Article'
import { PlusOutlined } from '@ant-design/icons'
import { NewArticle } from './NewArticle'
import { AppBar } from './AppBar'
import { fetchAll, postArticle } from './api'

// I need Rust enum. fuck typescript.
type ArticlesStatus = 'loading' | 'success' | 'fail'

function App() {
	const [articlesStatus, setArticlesStatus] =
		useState<ArticlesStatus>('loading')
	const [articles, setArticles] = useState<
		Array<ArticleData>
	>([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	const refresh = async () => {
		try {
			setArticles(await fetchAll())
			setArticlesStatus('success')
		} catch (err) {
			console.error(err)
			setArticlesStatus('fail')
		}
	}

	useEffect(() => void refresh(), [])

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
				<Layout.Content>
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
									onOk={async fields => {
										await postArticle(
											fields,
										)
										setIsModalOpen(
											false,
										)
										refresh()
									}}
									onCancel={() =>
										setIsModalOpen(
											false,
										)
									}
								/>
								{articles.map(ad => (
									<Article
										key={ad.id}
										{...ad}
										refresh={refresh}
									/>
								))}
							</Flex>
						) : (
							<Flex
								vertical
								justify="center"
								className="h-full"
							>
								<Result
									status="error"
									title="Failed to fetch data"
									subTitle="Seems like the backend doesn't work or was crashed."
									extra={[
										<Button type="primary">
											Open an issue on
											GitHub
										</Button>,
										<Button>
											Contact
											developer
										</Button>,
									]}
								></Result>
							</Flex>
						)}
					</Flex>
				</Layout.Content>
				<Layout.Footer className="h-40"></Layout.Footer>
			</Layout>
		</ConfigProvider>
	)
}

export default App
