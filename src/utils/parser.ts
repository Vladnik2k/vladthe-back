module.exports.parseDate = (date: Date): string => {
    let month: any = date.getMonth();
    switch (month) {
        case 0: month = 'січня'; break;
        case 1: month = 'лютого'; break;
        case 2: month = 'березня'; break;
        case 3: month = 'квітня'; break;
        case 4: month = 'травня'; break;
        case 5: month = 'червня'; break;
        case 6: month = 'липня'; break;
        case 7: month = 'серпня'; break;
        case 8: month = 'вересня'; break;
        case 9: month = 'жовтня'; break;
        case 10: month = 'листопада'; break;
        case 11: month = 'грудня'; break;
    }
    const year = date.getFullYear();
    const day = date.getUTCDate();
    const hours = getTwoDigits(date.getHours());
    const minutes = getTwoDigits(date.getMinutes());

    return `${day} ${month}, ${year}, ${hours}:${minutes}`
};

function getTwoDigits(number: number): string {
    return number < 10 ? '0' + number.toString() : number.toString();
}
