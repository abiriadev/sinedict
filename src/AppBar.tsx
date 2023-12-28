import { Flex, Layout, Typography, theme } from 'antd'
import { IconContext } from 'react-icons'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { ImTwitch } from 'react-icons/im'
import { User } from './User'
import { UserData } from './interface'

export const AppBar = ({
	user,
	setUser,
}: {
	user: UserData | null
	setUser: (user: UserData | null) => void
}) => {
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
						<User user={user} setUser={setUser} />
					</Flex>
				</IconContext.Provider>
			</Flex>
		</Layout.Header>
	)
}
