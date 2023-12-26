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
]

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Flex>
				{data.map(ad => (
					<Article {...ad} />
				))}
			</Flex>
		</>
	)
}

export default App
