import {connectionFactory as connection} from './connection-db'

export async function getData() {
    try {
        const data = await connection.query("select * from public.log_nfe_nfce_go", {})
        return data
    } catch (error) {
        console.log(error)
    }
}