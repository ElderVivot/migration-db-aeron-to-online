import {api} from '../api'
import {formatDate, formatDateTimeZone} from '../utils'
import {exportLogNfeNfceGO, ILogNfeNfceGOAeron} from '../aeron/log_nfe_nfce_go.repository'
import axios from 'axios'

function correlationSituationNotaFiscal(situationNotaFiscal: string) {
    if(situationNotaFiscal === "2") return '1'
    else if(situationNotaFiscal === "3") return '2'
    else return '1'
}

function mountDataLogNfeNfceGOToSave(logNfeNfceGO: ILogNfeNfceGOAeron) {
    return {
        updatedAt: formatDateTimeZone(logNfeNfceGO.updatedAt),
        federalRegistration: logNfeNfceGO.cgceCompanie,
        modelNotaFiscal: logNfeNfceGO.modelNF,
        situationNotaFiscal: correlationSituationNotaFiscal(logNfeNfceGO.situacaoNF),
        dateStartDown: formatDate(logNfeNfceGO.dateStartDown),
        dateEndDown: formatDate(logNfeNfceGO.dateEndDown),
        typeLog: logNfeNfceGO.typeLog,
        messageLog: logNfeNfceGO.messageLog,
        messageLogToShowUser: logNfeNfceGO.messageLogToShowUser,
        wayCertificate: logNfeNfceGO.wayCertificate,
        messageError: logNfeNfceGO.messageError,
        qtdNotesDown: logNfeNfceGO.qtdNotesDown,
        qtdTimesReprocessed: logNfeNfceGO.qtdTimesReprocessed,
        pageInicial: logNfeNfceGO.pageInicial,
        pageFinal: logNfeNfceGO.pageFinal,
        qtdPagesTotal: logNfeNfceGO.qtdPagesTotal
    }    
}

export async function saveLogNotes(tenant: string) {
    try {
        const dataLogNfeNfceGO = await exportLogNfeNfceGO()
        if(dataLogNfeNfceGO && dataLogNfeNfceGO.length > 0){
            for(const logNfeNfceGO of dataLogNfeNfceGO) {
                try {
                    const data = mountDataLogNfeNfceGOToSave(logNfeNfceGO)
                    console.log(data)
                    const result = await api.post("/log_nota_fiscal", data, { headers: { tenant } })
                    console.log(result.data)
                } catch (error) {
                    console.log('----------------------------------')
                    if(axios.isAxiosError(error)) console.log(error.response?.data)
                    else console.log(error)
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}