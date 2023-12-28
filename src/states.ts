import { atom } from 'jotai'
import { UserData } from './interface'

export const currentUser = atom<UserData | null>(null)
