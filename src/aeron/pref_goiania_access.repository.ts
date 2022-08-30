import {connectionFactory as connection} from './connection-db'

export interface IPrefGoianiaAccessAeron {    
    id: number    
    createdAt: Date    
    updatedAt: Date    
    user: String    
    password: string    
    name: string
    active: boolean
}

export async function exportPrefGoianiaAccess(): Promise<IPrefGoianiaAccessAeron[] | undefined> {
    try {
        const data = await connection.query("select * from public.pref_goiania_access", {})
        return data
    } catch (error) {
        console.log(error)
    }
}