import { Button, Flex, Typography } from 'antd'
import { ArticleData } from './interface'
import {
	UpOutlined,
	DownOutlined,
	DeleteOutlined,
	EditOutlined,
	BarChartOutlined,
} from '@ant-design/icons'
import { deleteArticle, upVote } from './api'

export const Article = ({
	id,
	word,
	description,
	example,
	up,
	down,
	refresh,
}: ArticleData & { refresh: () => Promise<void> }) => {
	return (
		<div className="p-4 bg-neutral-50 rounded-lg shadow-sm shadow-primary border border-primary">
			<Flex gap="middle">
				<Flex vertical align="center" gap="middle">
					<Flex vertical align="center">
						<UpOutlined
							onClick={async () => {
								try {
									await upVote(id)
									refresh()
								} catch {}
							}}
						/>
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
						onClick={async () => {
							try {
								await deleteArticle(id)

								refresh()
							} catch {}
						}}
					/>
				</Flex>
			</Flex>
		</div>
	)
}
