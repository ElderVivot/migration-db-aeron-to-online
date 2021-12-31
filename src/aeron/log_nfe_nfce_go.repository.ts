import {connectionFactory as connection} from './connection-db'

export interface ILogNfeNfceGOAeron {
    id: number
    createdAt: Date
    updatedAt: Date
    cgceCompanie: string
    codeCompanie: string
    nameCompanie: string
    modelNF: string
    situacaoNF: string
    wayCertificate: string
    hourLog: Date
    dateStartDown: Date
    dateEndDown: Date
    typeLog: 'success' | 'error' | 'warning' | 'processing' | 'to_process'
    messageLog: string
    messageLogToShowUser: string
    messageError: string
    urlImageDown: string
    qtdNotesDown: number
    qtdPagesTotal: number
    pageInicial: number
    pageFinal: number
    qtdTimesReprocessed: number
}

export async function exportLogNfeNfceGO(): Promise<ILogNfeNfceGOAeron[] | undefined> {
    try {
        const data = await connection.query("select * from public.log_nfe_nfce_go", {})
        return data
    } catch (error) {
        console.log(error)
    }
}