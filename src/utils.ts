export function formatDate(dateString: Date | null) {
    try {
        if(dateString) return dateString.toISOString().substring(0,10)
        else return null
    } catch (error) {
        // console.log(error)
        return null
    }    
}