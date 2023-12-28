import { Avatar, Dropdown, Typography } from 'antd'
import { signIn, signOut, whoAmI } from './api'
import {
	LoginOutlined,
	LogoutOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { useEffect } from 'react'
import { UserData } from './interface'

export const User = ({
	user,
	setUser,
}: {
	user: UserData | null
	setUser: (user: UserData | null) => void
}) => {
	useEffect(() => {
		;(async () => {
			try {
				setUser(await whoAmI())
			} catch {
				setUser(null)
			}
		})()
	}, [])

	return (
		<Dropdown
			menu={{
				items: user
					? [
							{
								key: 'name',
								label: user.name,
							},
							{
								key: 'sign out',
								label: 'Sign out',
								danger: true,
								icon: <LogoutOutlined />,
							},
					  ]
					: [
							{
								key: 'sign in',
								label: 'Sign in',
								icon: <LoginOutlined />,
							},
					  ],
				onClick: ({ key }) =>
					key === 'sign in'
						? signIn()
						: key === 'sign out'
						? signOut().then(() =>
								setUser(null),
						  )
						: void 0,
			}}
		>
			{user ? (
				<Avatar
					className="text-3xl"
					src={user.avatar}
				/>
			) : (
				<Avatar
					className="text-3xl bg-primary"
					icon={<UserOutlined />}
				/>
			)}
		</Dropdown>
	)
}
