import { Flex } from 'antd'
import { ArticleData } from './interface'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

export const Article = ({
	word,
	description,
	example,
	up,
	down,
}: ArticleData) => {
	return (
		<div
			style={{
				backgroundColor: '#eee',
				padding: 10,
			}}
		>
			<Flex gap="small">
				<Flex vertical align="center" gap="small">
					<Flex vertical align="center">
						<UpOutlined />
						<span>{up}</span>
					</Flex>
					<Flex vertical align="center">
						<span>{down}</span>
						<DownOutlined />
					</Flex>
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
