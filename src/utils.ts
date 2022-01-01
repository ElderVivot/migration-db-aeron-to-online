import { subHours } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

export function formatDate(dateString: Date | null) {
    try {
        if(dateString) return dateString.toISOString().substring(0,10)
        else return null
    } catch (error) {
        // console.log(error)
        return null
    }    
}

export function formatDateTimeZone (date: string | number | Date, timeZone: string = "America/Sao_Paulo"): Date | null {
    let newDate = zonedTimeToUtc(date, timeZone)
    newDate = subHours(newDate, 3)
    if (date) return newDate
    else return null
}