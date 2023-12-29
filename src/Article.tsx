import { Button, Flex, Typography } from 'antd'
import { Id, VoteValue } from './interface'
import {
	DeleteOutlined,
	EditOutlined,
	BarChartOutlined,
} from '@ant-design/icons'
import { deleteArticle } from './api'
import { Statistics } from './Statistics'
import { useState } from 'react'
import { Vote } from './Vote'

export interface ArticleProp {
	id: Id
	author: Id | null
	ismine: boolean
	word: string
	description: string
	example: string
	up: number
	down: number
	myvote: VoteValue | null
}

export const Article = ({
	id,
	author,
	ismine,
	word,
	description,
	example,
	up,
	down,
	myvote,
	refresh,
}: ArticleProp & { refresh: () => Promise<void> }) => {
	const [isStatisticsOpen, setIsStatisticsOpen] =
		useState(false)

	return (
		<div className="p-4 bg-neutral-50 rounded-lg shadow-sm shadow-primary border border-primary">
			<Flex gap="middle">
				<Vote
					article={id}
					up={up}
					down={down}
					value={myvote}
					refresh={refresh}
				/>
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
					{ismine && (
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
					)}
				</Flex>
			</Flex>
			<Statistics
				authorId={author}
				open={isStatisticsOpen}
				setOpen={setIsStatisticsOpen}
			/>
		</div>
	)
}
