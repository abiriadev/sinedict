import { Form, Input, Modal } from 'antd'

export interface NewArticleProps {
	open: boolean
	onOk: (fields: FieldType) => void
	onCancel: () => void
}

export interface FieldType {
	word: string
	description: string
	example: string
}

export const NewArticle = ({
	open,
	onOk,
	onCancel,
}: NewArticleProps) => {
	const [form] = Form.useForm()

	return (
		<Modal
			title="New article"
			open={open}
			onOk={async () => {
				try {
					const v: FieldType =
						await form.validateFields()

					form.resetFields()

					onOk(v)
				} catch {}
			}}
			onCancel={() => (
				form.resetFields(), onCancel()
			)}
		>
			<Form form={form} layout="vertical">
				<Form.Item<FieldType>
					name="word"
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
					name="description"
					label="Description"
					rules={[
						{
							required: true,
							message:
								'Please fill this form',
						},
					]}
				>
					<Input.TextArea
						autoSize={{
							minRows: 3,
							maxRows: 10,
						}}
					/>
				</Form.Item>
				<Form.Item<FieldType>
					name="example"
					label="Example"
					rules={[
						{
							required: true,
							message:
								'Please fill this form',
						},
					]}
				>
					<Input.TextArea
						autoSize={{
							minRows: 2,
							maxRows: 6,
						}}
					/>
				</Form.Item>
			</Form>
		</Modal>
	)
}
