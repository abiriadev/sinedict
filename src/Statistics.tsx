import { UserOutlined } from '@ant-design/icons'
import { Avatar, Modal, Typography } from 'antd'

export interface StatisticsProp {
	open: boolean
	setOpen: (open: boolean) => void
}

export const Statistics = ({
	open,
	setOpen,
}: StatisticsProp) => {
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
			<Typography.Text>Username</Typography.Text>
		</Modal>
	)
}
