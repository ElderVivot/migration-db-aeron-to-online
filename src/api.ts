import axios from 'axios'
import 'dotenv/config'

const host = process.env.API_HOST_BAYHERO

export const api = axios.create({
    baseURL: `${host}`
})