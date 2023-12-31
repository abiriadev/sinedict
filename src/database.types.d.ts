export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			articles: {
				Row: {
					author: string | null
					created_at: string
					description: string
					example: string
					id: string
					word: string
				}
				Insert: {
					author?: string | null
					created_at?: string
					description: string
					example: string
					id?: string
					word: string
				}
				Update: {
					author?: string | null
					created_at?: string
					description?: string
					example?: string
					id?: string
					word?: string
				}
				Relationships: [
					{
						foreignKeyName: 'articles_author_fkey'
						columns: ['author']
						isOneToOne: false
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
			users: {
				Row: {
					avatar: string
					id: string
					name: string
				}
				Insert: {
					avatar: string
					id: string
					name: string
				}
				Update: {
					avatar?: string
					id?: string
					name?: string
				}
				Relationships: [
					{
						foreignKeyName: 'users_id_fkey'
						columns: ['id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
			votes: {
				Row: {
					article: string
					user: string
					value: number
				}
				Insert: {
					article: string
					user: string
					value: number
				}
				Update: {
					article?: string
					user?: string
					value?: number
				}
				Relationships: [
					{
						foreignKeyName: 'votes_article_fkey'
						columns: ['article']
						isOneToOne: false
						referencedRelation: 'articles'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'votes_user_fkey'
						columns: ['user']
						isOneToOne: false
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			fetch_articles: {
				Args: {
					userid?: string
				}
				Returns: {
					id: string
					created_at: string
					author: string
					ismine: boolean
					word: string
					description: string
					example: string
					votes: number
					up: number
					down: number
					myvote: number
				}[]
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] &
				Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends {
	schema: keyof Database
}
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
			Database['public']['Views'])
	? (Database['public']['Tables'] &
			Database['public']['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R
	  }
		? R
		: never
	: never

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends {
	schema: keyof Database
}
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I
	  }
		? I
		: never
	: never

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends {
	schema: keyof Database
}
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U
	  }
		? U
		: never
	: never

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database['public']['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends {
	schema: keyof Database
}
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	? Database['public']['Enums'][PublicEnumNameOrOptions]
	: never
