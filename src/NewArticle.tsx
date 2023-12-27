import { Form, Input, Modal } from 'antd'
import { ArticleForm } from './interface'

export interface NewArticleProps {
	open: boolean
	onOk: (fields: ArticleForm) => void
	onCancel: () => void
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
					const v: ArticleForm =
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
				<Form.Item<ArticleForm>
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
				<Form.Item<ArticleForm>
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
				<Form.Item<ArticleForm>
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
