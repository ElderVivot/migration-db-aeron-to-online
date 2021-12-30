// import {Pool} from 'pg'
import pgPromise, { IDatabase, IResultExt } from 'pg-promise'
import 'dotenv/config'

const configConnection = {
    user: process.env.DB_USERNAME_AERON,
    password: process.env.DB_PASS_AERON,
    host: process.env.DB_HOST_AERON || 'localhost',
    port: Number(process.env.DB_PORT_AERON) || 5432,
    database: process.env.DB_NAME_AERON
}

type IResult = IResultExt
type IQuery = any
type IOne = any

export class Connection {
    private static connection: IDatabase<{}> 

    constructor () {
        if(!Connection.connection) Connection.connection = pgPromise()(configConnection)
    }

    async query (text: string, params: any): Promise<IQuery> {
        const start = Date.now()
        const result = await Connection.connection.query(text, params)
        const duration = Date.now() - start
        console.log('executed query', { start, duration, text })
        return result
    }

    async one (text: string, params: any): Promise<IOne> {
        const start = Date.now()
        const result = await Connection.connection.one(text, params)
        const duration = Date.now() - start
        console.log('executed query', { start, duration, text })
        return result
    }

    async result (text: string, params: any): Promise<IResult> {
        const start = Date.now()
        const result = await Connection.connection.result(text, params)
        const duration = Date.now() - start
        console.log('executed query', { start, duration, text })
        return result
    }
}

export const connectionFactory = new Connection()