import {saveCompanies} from './companie'
import {saveLogNotes} from './log_notes'
import 'dotenv/config'
import { saveAcessPortals } from './access_portals'

saveCompanies(process.env.TENANT || '').then(_ => console.log('Save companies with sucess'))
saveLogNotes(process.env.TENANT || '').then(_ => console.log('Save log notes with sucess'))
saveAcessPortals(process.env.TENANT || '').then(_ => console.log('Save access_portals with sucess'))