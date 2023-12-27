import { Avatar, Button, Dropdown, Typography } from 'antd'
import { signIn, signOut, whoAmI } from './api'
import {
	LoginOutlined,
	LogoutOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { User as SbUser } from '@supabase/supabase-js'

export const User = () => {
	const [user, setUser] = useState<SbUser | null>(null)

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
				items: [
					user
						? {
								key: 'sign out',
								label: (
									<Typography.Text>
										Sign out
									</Typography.Text>
								),
								danger: true,
								icon: <LogoutOutlined />,
						  }
						: {
								key: 'sign in',
								label: (
									<Typography.Text>
										Sign in
									</Typography.Text>
								),
								icon: <LoginOutlined />,
						  },
				],
				onClick: ({ key }) =>
					key === 'sign in'
						? signIn()
						: signOut().then(() =>
								setUser(null),
						  ),
			}}
		>
			{user ? (
				<Avatar
					className="text-3xl"
					src={user.user_metadata.avatar_url}
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
