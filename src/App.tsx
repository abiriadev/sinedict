import { useEffect, useState } from 'react'
import {
	Button,
	ConfigProvider,
	Flex,
	Layout,
	Result,
	Spin,
	message,
} from 'antd'
import { ArticleData } from './interface'
import { Article } from './Article'
import { PlusOutlined } from '@ant-design/icons'
import { NewArticle } from './NewArticle'
import { AppBar } from './AppBar'
import { fetchAll, postArticle } from './api'
import { useAtomValue } from 'jotai'
import { currentUserAtom } from './states'

// I need Rust enum. fuck typescript.
type ArticlesStatus = 'loading' | 'success' | 'fail'

function App() {
	const [articlesStatus, setArticlesStatus] =
		useState<ArticlesStatus>('loading')
	const [articles, setArticles] = useState<
		Array<ArticleData>
	>([])
	const [isNewArticleOpen, setIsNewArticleOpen] =
		useState(false)
	const currentUser = useAtomValue(currentUserAtom)
	const [msg, ctxHolder] = message.useMessage()

	const refresh = async () => {
		try {
			setArticles(await fetchAll(currentUser?.id))
			setArticlesStatus('success')
		} catch (err) {
			console.error(err)
			setArticlesStatus('fail')
		}
	}

	useEffect(() => void refresh(), [currentUser])

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
			{ctxHolder}
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
									className={
										currentUser
											? ''
											: 'invisible'
									}
									onClick={() =>
										setIsNewArticleOpen(
											true,
										)
									}
								>
									Add new
								</Button>
								<NewArticle
									open={isNewArticleOpen}
									onOk={async fields => {
										try {
											if (
												currentUser ===
												null
											)
												throw 'should login first before creating new article'

											await postArticle(
												{
													...fields,
													author: currentUser.id,
												},
											)
											setIsNewArticleOpen(
												false,
											)
											refresh()
										} catch (err) {
											msg.error(
												`failed to create new article: ${JSON.stringify(
													err,
													null,
													2,
												)}`,
											)
										}
									}}
									onCancel={() =>
										setIsNewArticleOpen(
											false,
										)
									}
								/>
								{articles.map(
									({
										id,
										author,
										ismine,
										word,
										description,
										example,
										up,
										down,
										myvote,
									}) => (
										<Article
											key={id}
											id={id}
											author={author}
											ismine={ismine}
											word={word}
											description={
												description
											}
											example={
												example
											}
											up={up}
											down={down}
											myvote={myvote}
											refresh={
												refresh
											}
										/>
									),
								)}
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
