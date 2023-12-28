import {
	ArticleData,
	ArticleForm,
	Id,
	UserData,
	VoteForm,
} from './interface'
import { supabase } from './supabase'

// failable
export const fetchAll = async (): Promise<
	Array<ArticleData>
> => {
	const { data, error } = await supabase
		.from('articles')
		.select()

	if (error) throw error

	return data.map(d => ({ ...d, up: 0, down: 0 }))
}

// failable
export const postArticle = async (
	form: ArticleForm,
): Promise<void> => {
	const { error } = await supabase
		.from('articles')
		.insert(form)

	if (error) throw error
}

// failable
export const deleteArticle = async (
	id: Id,
): Promise<void> => {
	const { error } = await supabase
		.from('articles')
		.delete()
		.eq('id', id)

	if (error) throw error
}

export const signIn = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'discord',
	})

	if (error) throw error
}

export const whoAmI = async (): Promise<UserData> => {
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession()

	if (error) throw error
	if (session === null) throw 'session is not detected'

	const { id, user_metadata } = session.user

	if (user_metadata.avatar_url === undefined)
		throw 'avatar_url is not defined'
	if (user_metadata.full_name === undefined)
		throw 'full_name is not defined'

	return {
		id,
		name: user_metadata.full_name,
		avatar: user_metadata.avatar_url,
	}
}

export const signOut = async () => {
	const { error } = await supabase.auth.signOut({
		scope: 'global',
	})

	if (error) throw error
}

export const fetchUser = async (id: Id) => {
	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('id', id)
		.single()

	if (error) throw error
	if (data === null) throw 'user does not exist'

	return data
}

const vote = async (vote: VoteForm) => {
	const { error } = await supabase
		.from('votes')
		.upsert(vote)

	if (error) throw error
}

export const upVote = (article: Id, user: Id) =>
	vote({
		article,
		user,
		value: 1,
	})

export const downVote = (article: Id, user: Id) =>
	vote({
		article,
		user,
		value: -1,
	})

export const unVote = async (article: Id, user: Id) => {
	const { error } = await supabase
		.from('votes')
		.delete()
		.eq('article', article)
		.eq('user', user)

	if (error) throw error
}
