import { Avatar, Dropdown } from 'antd'
import { signIn, signOut, whoAmI } from './api'
import {
	LoginOutlined,
	LogoutOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { currentUserAtom } from './states'

export const User = () => {
	const [currentUser, setCurrentUser] =
		useAtom(currentUserAtom)

	useEffect(() => {
		;(async () => {
			try {
				setCurrentUser(await whoAmI())
			} catch {
				setCurrentUser(null)
			}
		})()
	}, [])

	return (
		<Dropdown
			menu={{
				items: currentUser
					? [
							{
								key: 'name',
								label: currentUser.name,
							},
							{
								key: 'sign out',
								label: '로그아웃',
								danger: true,
								icon: <LogoutOutlined />,
							},
					  ]
					: [
							{
								key: 'sign in',
								label: '로그인',
								icon: <LoginOutlined />,
							},
					  ],
				onClick: ({ key }) =>
					key === 'sign in'
						? signIn()
						: key === 'sign out'
						? signOut().then(() =>
								setCurrentUser(null),
						  )
						: void 0,
			}}
		>
			{currentUser ? (
				<Avatar
					className="text-3xl"
					src={currentUser.avatar}
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
