import { ArticleData, ArticleForm, Id } from './interface'
import { supabase } from './supabase'

// failable
export const fetchAll = async (): Promise<
	Array<ArticleData>
> => {
	const { data, error } = await supabase
		.from('articles')
		.select()

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
