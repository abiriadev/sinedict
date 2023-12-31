// opaque primary key type
export type Id = string

export interface UserData {
	id: Id
	name: string
	avatar: string
}

export interface ArticleData {
	id: Id
	author: Id | null
	ismine: boolean
	word: string
	description: string
	example: string
	votes: number
	up: number
	down: number
	myvote: VoteValue | null
}

export interface ArticleForm {
	author: Id
	word: string
	description: string
	example: string
}

export type VoteValue = -1 | 1

export interface VoteForm {
	user: Id
	article: Id
	value: VoteValue
}

export interface VoterData {
	value: VoteValue
	user: UserData
}
