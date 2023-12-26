import { Flex, Space } from 'antd'
import { ArticleData } from './interface'

export const Article = ({
	word,
	description,
	example,
}: ArticleData) => {
	return (
		<div
			style={{
				backgroundColor: 'lightgray',
				padding: 10,
			}}
		>
			<Flex vertical align="start" gap="large">
				<h3
					style={{
						margin: 0,
					}}
				>
					{word}
				</h3>
				<Flex vertical align="start" gap="small">
					<p
						style={{
							margin: 0,
						}}
					>
						{description}
					</p>
					<p
						style={{
							margin: 0,
						}}
					>
						{example}
					</p>
				</Flex>
			</Flex>
		</div>
	)
}
