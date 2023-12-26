import { Button, Flex } from 'antd'
import { ArticleData } from './interface'
import {
	UpOutlined,
	DownOutlined,
	DeleteOutlined,
} from '@ant-design/icons'

export const Article = ({
	word,
	description,
	example,
	up,
	down,
}: ArticleData) => {
	return (
		<div className="p-4 bg-neutral-100 rounded-lg shadow-md">
			<Flex gap="middle">
				<Flex vertical align="center" gap="middle">
					<Flex vertical align="center">
						<UpOutlined />
						<span>{up}</span>
					</Flex>
					<Flex vertical align="center">
						<span>{down}</span>
						<DownOutlined />
					</Flex>
				</Flex>
				<Flex
					vertical
					align="start"
					gap="large"
					className="mr-auto"
				>
					<h3>{word}</h3>
					<Flex
						vertical
						align="start"
						gap="small"
					>
						<p>{description}</p>
						<p>{example}</p>
					</Flex>
				</Flex>
				<Flex vertical>
					<Button icon={<DeleteOutlined />} />
				</Flex>
			</Flex>
		</div>
	)
}
