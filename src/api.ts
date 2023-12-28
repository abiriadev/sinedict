import {
	ArticleData,
	ArticleForm,
	Id,
	UserData,
} from './interface'
import { supabase } from './supabase'

// failable
export const fetchAll = async (): Promise<
	Array<ArticleData>
> => {
	const { data, error } = await supabase
		.from('articles')
		.select()
		.order('up', {
			ascending: false,
		})

	if (error) throw error

	return data
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

// failable
export const upVote = async (id: Id): Promise<void> => {
	const { data, error } = await supabase
		.from('articles')
		.select('up')
		.eq('id', id)
		.single()

	if (error) throw error
	if (data === null) throw 'not found'

	const { error: error2 } = await supabase
		.from('articles')
		.update({
			up: data.up + 1,
		})
		.eq('id', id)

	if (error2) throw error2
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
