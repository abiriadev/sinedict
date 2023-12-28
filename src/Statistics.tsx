import { UserOutlined } from '@ant-design/icons'
import { Avatar, Modal, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Id, UserData } from './interface'
import { fetchUser } from './api'

export interface StatisticsProp {
	authorId: Id | null
	open: boolean
	setOpen: (open: boolean) => void
}

export const Statistics = ({
	authorId,
	open,
	setOpen,
}: StatisticsProp) => {
	const [author, setAuthor] = useState<UserData | null>(
		null,
	)

	useEffect(() => {
		if (!open || authorId === null) return
		;(async () => {
			try {
				setAuthor(await fetchUser(authorId))
			} catch (err) {
				console.error(err)
			}
		})()
	}, [open])

	return (
		<Modal
			title="Statistics"
			open={open}
			onCancel={() => setOpen(false)}
			footer={() => <></>}
		>
			<Typography.Title level={3}>
				Author
			</Typography.Title>
			<Avatar icon={<UserOutlined />} />
			<Typography.Text>
				{author?.name ?? 'author'}
			</Typography.Text>
		</Modal>
	)
}
