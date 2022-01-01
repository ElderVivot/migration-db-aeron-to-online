import {connectionFactory as connection} from './connection-db'

export interface ICompanieAeron {
    id: number
    createdAt: Date
    updatedAt: Date
    deletedInOriginalDatabase: boolean    
    code: string    
    name: string    
    nickName: string    
    typeCgce: string    
    cgce: string    
    status: string    
    ddd: number    
    fone: string    
    email: string    
    ramo: string    
    dateInicialAsCompanie: Date    
    dateInicialAsClient: Date    
    dateFinalAsClient: Date    
    inscricaoEstadual: string    
    inscricaoMunicipal: string    
    uf: string    
    regimeFiscal: string
}

export async function exportCompanies(): Promise<ICompanieAeron[] | undefined> {
    try {
        const data = await connection.query("select * from public.companies", {})
        return data
    } catch (error) {
        console.log(error)
    }
}