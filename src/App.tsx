import { useState } from 'react'
import { Flex } from 'antd'
import { ArticleData } from './interface'
import { Article } from './Article'

const data: Array<ArticleData> = [
	{
		word: 'asdf',
		description: 'adfada',
		example: 'adfa',
	},
	{
		word: 'siba',
		description: 'sine bye',
		example: 'siba~',
	},
]

function App() {
	const [articles, _] = useState(data)

	return (
		<>
			<Flex>
				{articles.map(ad => (
					<Article {...ad} />
				))}
			</Flex>
		</>
	)
}

export default App
