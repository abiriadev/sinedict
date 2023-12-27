import { Avatar, Button, Dropdown } from 'antd'
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
											signOut()
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
				className="text-3xl bg-primary"
				{...(user
					? user.user_metadata.avatar_url
					: {
							icon: <UserOutlined />,
					  })}
			/>
		</Dropdown>
	)
}
