/**
 * Convert từ timestamp sang datetime (Day, Date Month Year HH:MM)
 * Created by NVDung (01/08/2022)
**/
export default function getDateTimeFromTimestamp(timestamp) {
    var date = new Date(timestamp * 1000);
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var res = 'Thứ ' + date.getDay() + ', ' + day + ' Tháng ' + month + ' ' + date.getFullYear();
    return res;
}

/**
 * Convert từ timestamp sang date (DD/MM/YYYY)
 * Created by NVDung (05/08/2022)
**/
export function getDateFromTimestamp(timestamp) {
    var date = new Date(timestamp * 1000);
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var res = day + '.' + month + '.' + date.getFullYear();
    return res;
}

/**
 * Format date sang date (DD/MM/YYYY)
 * Created by NVDung (05/08/2022)
**/
export function formatDate(date) {
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var res = day + '/' + month + '/' + date.getFullYear();
    return res;
}
/**
 * So sánh ngày tháng năm
 * Created by NVDung (05/08/2022)
**/
export function compareDate(date1, date2) {
    if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()) {
        return true
    }
    return false
}