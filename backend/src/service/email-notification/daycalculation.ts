export function getDayRange(dayText: string): { startDate: number, endDate: number } {

    const day = dayText.toLowerCase().replace('day', '');

    if(day.includes('-')){
        const [startDate, endDate] = day.split('-');
        return { startDate: Number(startDate), endDate: Number(endDate) };
    }

    const singleday = Number(day);
    return { startDate: singleday, endDate: singleday };
}

export function getTodayDay(startDate: string) {
    
    const planStartDate = new Date(startDate);
    const today = new Date();

    const diff = today.getTime() - planStartDate.getTime();
    const diffDay = (Math.floor(diff / (1000 * 60 * 60 * 24)));

    return diffDay + 1;
}