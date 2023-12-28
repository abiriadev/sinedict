import { atom } from 'jotai'
import { UserData } from './interface'

export const currentUserAtom = atom<UserData | null>(null)
