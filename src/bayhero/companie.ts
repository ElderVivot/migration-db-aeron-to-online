import {api} from '../api'
import {exportCompanies, ICompanieAeron} from '../aeron/companies.repository'
import axios from 'axios'

function correlationTypeCgce(typeCgce: string) {
    if(typeCgce === "1") return 'cnpj'
    else if(typeCgce === "2") return 'cpf'
    else if(typeCgce === "3") return 'cei'
    else return 'cnpj'
}

function correlationStatus(status: string) {
    if(status === "A") return 'ACTIVE'
    else if(status === "I") return 'INACTIVE'
    else return 'ACTIVE'
}

function correlationTaxRegime(taxRegime: string) {
    if(taxRegime === "2" || taxRegime === "4") return '01'
    else if(taxRegime === "5") return '02'
    else if(taxRegime === "1") return '03'
    else return '99'
}

function mountDataCompanieToSave(companie: ICompanieAeron) {
    return {
        codeCompanieAccountSystem: companie.code,
        name: companie.name,
        nickName: companie.nickName,
        typeFederalRegistration: correlationTypeCgce(companie.typeCgce),
        federalRegistration: companie.cgce,
        stateRegistration: companie.inscricaoEstadual,
        cityRegistration: companie.inscricaoMunicipal,
        status: correlationStatus(companie.status),
        dddPhone: companie.ddd,
        phone: companie.fone,
        email: companie.email,
        neighborhood: "",
        street: "",
        zipCode: "",
        complement: "",
        referency: "",
        dateInicialAsCompanie: companie.dateInicialAsCompanie,
        dateInicialAsClient: companie.dateInicialAsClient,
        dateFinalAsClient: companie.dateFinalAsClient,
        cnaes: "",
        taxRegime: correlationTaxRegime(companie.regimeFiscal),
        idIbgeCity: 520008
    }    
}

export async function saveCompanies(tenant: string) {
    try {
        const dataCompanies = await exportCompanies()
        if(dataCompanies && dataCompanies.length > 0){
            for(const companie of dataCompanies) {
                try {
                    const data = mountDataCompanieToSave(companie)
                    const result = await api.post("/companie", 
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