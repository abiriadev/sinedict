import { Form, Input, Modal } from 'antd'

export interface NewArticleProps {
	open: boolean
	onOk: () => void
	onCancel: () => void
}

export interface FieldType {
	word: string
	description: string
	example: string
}

export const NewArticle = (props: NewArticleProps) => {
	return (
		<Modal title="New article" {...props}>
			<Form layout="vertical">
				<Form.Item<FieldType>
					label="Word"
					rules={[
						{
							required: true,
							message:
								'Please fill this form',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType>
					label="Description"
					rules={[
						{
							required: true,
							message:
								'Please fill this form',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType>
					label="Example"
					rules={[
						{
							required: true,
							message:
								'Please fill this form',
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	)
}
