import { Flex } from 'antd'
import { ArticleData } from './interface'

export const Article = ({
	word,
	description,
	example,
}: ArticleData) => {
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
