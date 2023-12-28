import { Button, Flex, Typography } from 'antd'
import { ArticleData, Id } from './interface'
import {
	UpOutlined,
	DownOutlined,
	DeleteOutlined,
	EditOutlined,
	BarChartOutlined,
} from '@ant-design/icons'
import { deleteArticle, upVote } from './api'
import { Statistics } from './Statistics'
import { useState } from 'react'

export interface ArticleProp {
	id: Id
	isMyArticle: boolean
	word: string
	description: string
	example: string
	up: number
	down: number
}

export const Article = ({
	id,
	isMyArticle,
	word,
	description,
	example,
	up,
	down,
	refresh,
}: ArticleProp & { refresh: () => Promise<void> }) => {
	const [isStatisticsOpen, setIsStatisticsOpen] =
		useState(false)

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
					<Button
						icon={<BarChartOutlined />}
						onClick={() =>
							setIsStatisticsOpen(true)
						}
					/>
					<Button icon={<EditOutlined />} />
					{isMyArticle ? (
						<Button
							icon={<DeleteOutlined />}
							danger
							onClick={async () => {
								try {
									await deleteArticle(id)

									refresh()
								} catch (err) {
									console.error(err)
								}
							}}
						/>
					) : null}
				</Flex>
			</Flex>
			<Statistics open={isStatisticsOpen} />
		</div>
	)
}
