import {
	LogoutOutlined,
	UserOutlined,
} from '@ant-design/icons'
import {
	Avatar,
	Dropdown,
	Flex,
	Layout,
	Typography,
	theme,
} from 'antd'
import { IconContext } from 'react-icons'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { ImTwitch } from 'react-icons/im'

export const AppBar = () => {
	const { token } = theme.useToken()

	return (
		<Layout.Header className="sticky top-0 z-10 backdrop-blur-md">
			<Flex
				align="center"
				justify="space-between"
				className="h-full"
			>
				<Typography.Title level={1}>
					UpDict
				</Typography.Title>
				<IconContext.Provider
					value={{
						color: token.colorPrimary,
						className: 'text-3xl',
					}}
				>
					<Flex gap="large" align="center">
						<a href="" className="leading-none">
							<ImTwitch />
						</a>
						<a href="" className="leading-none">
							<FaDiscord />
						</a>
						<a href="" className="leading-none">
							<FaGithub />
						</a>
						<Dropdown
							menu={{
								items: [
									{
										key: '1',
										label: 'Sign out',
										danger: true,
										icon: (
											<LogoutOutlined />
										),
									},
								],
							}}
						>
							<Avatar
								className="text-3xl"
								icon={<UserOutlined />}
							/>
						</Dropdown>
					</Flex>
				</IconContext.Provider>
			</Flex>
		</Layout.Header>
	)
}
