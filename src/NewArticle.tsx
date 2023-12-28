import { Form, Input, Modal } from 'antd'

export interface NewArticleProps {
	open: boolean
	onOk: (fields: NewArticleForm) => void
	onCancel: () => void
}

export interface NewArticleForm {
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
					const v: NewArticleForm =
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
				<Form.Item<NewArticleForm>
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
				<Form.Item<NewArticleForm>
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
				<Form.Item<NewArticleForm>
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
