import {api} from '../api'
import {exportPrefGoianiaAccess, IPrefGoianiaAccessAeron} from '../aeron/pref_goiania_access.repository'
import axios from 'axios'

function mountDataCompanieToSave(prefGoianiaAccess: IPrefGoianiaAccessAeron) {
    return {
        idTypeAccessPortals: "6a009e00-47b0-4e45-a28f-87a3481b2060",
        nameAccess: prefGoianiaAccess.name,
        login: prefGoianiaAccess.user,
        password: prefGoianiaAccess.password,
        status: 'ACTIVE'
    }    
}

export async function saveAcessPortals(tenant: string) {
    try {
        const dataPrefGoiania = await exportPrefGoianiaAccess()
        if(dataPrefGoiania && dataPrefGoiania.length > 0){
            for(const prefGoiania of dataPrefGoiania) {
                try {
                    const data = mountDataCompanieToSave(prefGoiania)
                    const result = await api.post( "/access_portals", data, { headers: {tenant } } )
                    console.log(result.data)
                } catch (error) {
                    console.log('----------------------------------')
                    if(axios.isAxiosError(error)) {
                        console.log(error.response?.data)
                        console.log(error.response?.config.data)
                    }
                    else console.log(error)
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}