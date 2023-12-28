import { Modal } from 'antd'

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
		></Modal>
	)
}
