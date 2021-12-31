import {api} from '../api'
import {exportLogNfeNfceGO, ILogNfeNfceGOAeron} from '../aeron/log_nfe_nfce_go.repository'
import axios from 'axios'

function correlationSituationNotaFiscal(situationNotaFiscal: string) {
    if(situationNotaFiscal === "2") return '1'
    else if(situationNotaFiscal === "3") return '2'
    else return '1'
}

function mountDataLogNfeNfceGOToSave(logNfeNfceGO: ILogNfeNfceGOAeron) {
    return {
        federalRegistration: logNfeNfceGO.cgceCompanie,
        modelNotaFiscal: logNfeNfceGO.modelNF,
        situationNotaFiscal: correlationSituationNotaFiscal(logNfeNfceGO.situacaoNF),
        dateStartDown: logNfeNfceGO.dateStartDown,
        dateEndDown: logNfeNfceGO.dateEndDown,
        typeLog: logNfeNfceGO.typeLog,
        messageLog: logNfeNfceGO.messageLog,
        messageLogToShowUser: logNfeNfceGO.messageLogToShowUser,
        wayCertificate: logNfeNfceGO.wayCertificate,
        messageError: logNfeNfceGO.messageError,
        qtdNotesDown: logNfeNfceGO.qtdNotesDown,
        qtdTimesReprocessed: logNfeNfceGO.qtdTimesReprocessed,
        pageInicial: logNfeNfceGO.pageInicial,
        pageFinal: logNfeNfceGO.pageFinal
    }    
}

export async function saveLogNotes(tenant: string) {
    try {
        const dataLogNfeNfceGO = await exportLogNfeNfceGO()
        if(dataLogNfeNfceGO && dataLogNfeNfceGO.length > 0){
            for(const logNfeNfceGO of dataLogNfeNfceGO) {
                try {
                    const data = mountDataLogNfeNfceGOToSave(logNfeNfceGO)
                    const result = await api.post("/log_nota_fiscal", 
                        data, 
                        {
                            headers: {
                                tenant
                            }
                        }
                    )
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