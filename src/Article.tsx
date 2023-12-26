import { Flex, Statistic } from 'antd'
import { ArticleData } from './interface'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

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
			<Flex>
				<Flex vertical>
					<UpOutlined />
					<DownOutlined />
				</Flex>
				<Flex vertical align="start" gap="large">
					<h3
						style={{
							margin: 0,
						}}
					>
						{word}
					</h3>
					<Flex
						vertical
						align="start"
						gap="small"
					>
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
			</Flex>
		</div>
	)
}
