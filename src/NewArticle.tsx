import { Modal } from 'antd'

export interface NewArticleProps {
	open: boolean
	onOk: () => void
	onCancel: () => void
}

export const NewArticle = (props: NewArticleProps) => {
	return (
		<Modal title="New article" {...props}>
			<p>Word</p>
			<p>Description</p>
			<p>Example</p>
		</Modal>
	)
}
