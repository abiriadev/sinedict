import { Button, Flex, Typography } from 'antd'
import { Id } from './interface'
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
import { useAtomValue } from 'jotai'
import { currentUserAtom } from './states'

export interface ArticleProp {
	id: Id
	author: Id | null
	word: string
	description: string
	example: string
	up: number
	down: number
}

export const Article = ({
	id,
	author,
	word,
	description,
	example,
	up,
	down,
	refresh,
}: ArticleProp & { refresh: () => Promise<void> }) => {
	const currentUser = useAtomValue(currentUserAtom)
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
					{author !== null &&
					author === currentUser?.id ? (
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
			<Statistics
				authorId={author}
				open={isStatisticsOpen}
				setOpen={setIsStatisticsOpen}
			/>
		</div>
	)
}
