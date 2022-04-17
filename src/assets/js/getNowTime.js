const getNowTime = function (type) {
    let date = new Date()
    var dataValue = ''
    if (type === 'month') {
        dataValue = date.getFullYear() + '-' + (1 + date.getMonth() > 9 ? 1 + date.getMonth() : '0' + 1 + date.getMonth())
        console.log('data', dataValue);
    } else if (type === 'day') {
        dataValue = date.getFullYear() + '-' + (1 + date.getMonth() > 9 ? 1 + date.getMonth() : '0' + 1 + date.getMonth()) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
        console.log('data', dataValue);
    } else if (type === 'yesterday') {
        let yesterday = new Date();
        yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000);
        dataValue = yesterday.getFullYear() + '-' + (1 + yesterday.getMonth() > 9 ? 1 + yesterday.getMonth() : '0' + (1 + yesterday.getMonth())) + '-' + (yesterday.getDate() > 9 ? yesterday.getDate() : '0' + yesterday.getDate())
    }
    return dataValue
}

export default getNowTime