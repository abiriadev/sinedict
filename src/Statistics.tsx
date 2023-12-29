import { UserOutlined } from '@ant-design/icons'
import {
	Avatar,
	Modal,
	Skeleton,
	Tooltip,
	Typography,
	message,
} from 'antd'
import { useEffect, useState } from 'react'
import { Id, UserData, VoterData } from './interface'
import { fetchUser, fetchVoters } from './api'

export interface StatisticsProp {
	article: Id
	authorId: Id | null
	up: number
	down: number
	open: boolean
	setOpen: (open: boolean) => void
}

export const Statistics = ({
	article,
	authorId,
	up,
	down,
	open,
	setOpen,
}: StatisticsProp) => {
	const [author, setAuthor] = useState<UserData | null>(
		null,
	)
	const [voters, setVoters] =
		useState<Array<VoterData> | null>(null)
	const [msg, ctxHolder] = message.useMessage()

	useEffect(() => {
		if (!open || authorId === null) return
		;(async () => {
			try {
				setAuthor(await fetchUser(authorId))
			} catch (err) {
				msg.error(
					`failed to fetch user data: ${JSON.stringify(
						err,
						null,
						2,
					)}`,
				)
			}
		})()
	}, [open])

	useEffect(() => {
		if (!open) return
		;(async () => {
			try {
				setVoters(await fetchVoters(article))
			} catch (err) {
				msg.error(
					`failed to fetch voters data: ${JSON.stringify(
						err,
						null,
						2,
					)}`,
				)
			}
		})()
	}, [open])

	return (
		<Modal
			title="통계"
			open={open}
			onCancel={() => setOpen(false)}
			footer={() => <></>}
		>
			{ctxHolder}
			<Typography.Title level={3}>
				Author
			</Typography.Title>
			{author ? (
				<Avatar src={author.avatar} />
			) : (
				<Avatar icon={<UserOutlined />} />
			)}
			<Typography.Text>
				{author?.name ?? 'author'}
			</Typography.Text>
			<Typography.Title level={3}>
				Voters
			</Typography.Title>
			<Avatar.Group>
				{voters
					? voters.map(
							({
								user: { id, name, avatar },
							}) => (
								<Tooltip
									key={id}
									title={name}
								>
									<Avatar src={avatar} />
								</Tooltip>
							),
					  )
					: Array.from(
							{ length: up + down },
							(_, i) => (
								<Skeleton.Avatar
									key={i}
									active
								/>
							),
					  )}
			</Avatar.Group>
		</Modal>
	)
}
