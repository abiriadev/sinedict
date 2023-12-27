import { Avatar, Button, Dropdown } from 'antd'
import { signIn, whoAmI } from './api'
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
			setUser(await whoAmI())
		})()
	})

	return (
		<Dropdown
			menu={{
				items: [
					user
						? {
								key: '1',
								label: (
									<Button
										type="text"
										onClick={() =>
											signIn()
										}
									>
										Sign out
									</Button>
								),
								danger: true,
								icon: <LogoutOutlined />,
						  }
						: {
								key: '1',
								label: (
									<Button
										type="text"
										onClick={() =>
											signIn()
										}
									>
										Sign in
									</Button>
								),
								icon: <LoginOutlined />,
						  },
				],
			}}
		>
			<Avatar
				className="text-3xl"
				icon={
					user ? (
						<img
							src={
								user.user_metadata
									.avatar_url
							}
						/>
					) : (
						<UserOutlined />
					)
				}
			/>
		</Dropdown>
	)
}
