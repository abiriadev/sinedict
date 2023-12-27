import { Button, Flex, Typography } from 'antd'
import { ArticleData } from './interface'
import {
	UpOutlined,
	DownOutlined,
	DeleteOutlined,
	EditOutlined,
	BarChartOutlined,
} from '@ant-design/icons'

export const Article = ({
	word,
	description,
	example,
	up,
	down,
}: ArticleData) => {
	return (
		<div className="p-4 bg-neutral-100 rounded-lg shadow-sm shadow-primary border border-primary">
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
					<Typography.Title level={3}>
						{word}
					</Typography.Title>
					<Flex
						vertical
						align="start"
						gap="small"
					>
						<Typography.Text>
							{description}
						</Typography.Text>
						<Typography.Text>
							{example}
						</Typography.Text>
					</Flex>
				</Flex>
				<Flex vertical gap="small">
					<Button icon={<BarChartOutlined />} />
					<Button icon={<EditOutlined />} />
					<Button
						icon={<DeleteOutlined />}
						danger
					/>
				</Flex>
			</Flex>
		</div>
	)
}
