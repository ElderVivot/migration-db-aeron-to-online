import axios from 'axios'
import 'dotenv/config'

let host = process.env.API_HOST_BAYHERO
if(process.env.API_PORT_BAYHERO){
    host = `${host}:${process.env.API_PORT_BAYHERO}/v1`
}

export const api = axios.create({
    baseURL: `http://${host}`
})