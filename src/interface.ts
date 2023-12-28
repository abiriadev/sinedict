// opaque primary key type
export type Id = string

export interface ArticleData {
	id: Id
	author: Id
	word: string
	description: string
	example: string
	up: number
	down: number
}

export interface ArticleForm {
	word: string
	description: string
	example: string
}
