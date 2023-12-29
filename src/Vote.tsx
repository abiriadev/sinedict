import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { Id, VoteValue } from './interface'
import { downVote, upVote } from './api'
import { useAtomValue } from 'jotai'
import { currentUserAtom } from './states'

export interface VoteProps {
	article: Id
	up: number
	down: number
	value: VoteValue | null
}

export const Vote = ({
	article,
	up,
	down,
	value,
}: VoteProps) => {
	const currentUser = useAtomValue(currentUserAtom)

	return (
		<Flex vertical align="center" gap="middle">
			<Flex vertical align="center">
				<UpOutlined
					className={
						value === 1
							? 'stroke-primary stroke-[75px]'
							: 'stroke-current stroke-[20px] '
					}
					onClick={async () => {
						if (currentUser === null) {
							console.log('login first')
							return
						}

						try {
							await upVote(
								article,
								currentUser.id,
							)
							refresh()
						} catch {}
					}}
				/>
				<span>{up}</span>
			</Flex>
			<Flex vertical align="center">
				<span>{down}</span>
				<DownOutlined
					className={
						value === -1
							? 'stroke-primary stroke-[75px]'
							: 'stroke-current stroke-[20px] '
					}
					onClick={async () => {
						if (currentUser === null) {
							console.log('login first')
							return
						}

						try {
							await downVote(
								article,
								currentUser.id,
							)
							refresh()
						} catch {}
					}}
				/>
			</Flex>
		</Flex>
	)
}
