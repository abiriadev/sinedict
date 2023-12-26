import { Flex } from 'antd'
import { Article as ArticleProp } from './interface'

export const Article = ({
	word,
	description,
	example,
}: ArticleProp) => {
	return (
		<div>
			<Flex>
				<h3>{word}</h3>
				<p>{description}</p>
				<p>{example}</p>
			</Flex>
		</div>
	)
}
