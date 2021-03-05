/**
 * @param {Number} milliseconds
 */
function parseMS(milliseconds) {
    let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
    return {
        days: roundTowardsZero(milliseconds / 86400000),
        hours: roundTowardsZero(milliseconds / 3600000) % 24,
        minutes: roundTowardsZero(milliseconds / 60000) % 60,
        seconds: roundTowardsZero(milliseconds / 1000) % 60,
        milliseconds: roundTowardsZero(milliseconds) % 1000
    };
}

/**
 * @param {Number} first
 * @param {Number} second
 */
function getRandomInRange(first, second) {
    let min,max
    if(first>second) {
        min = second;
        max = first;
    } else {
        min = first;
        max = second;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function securitylevel(level) {
    if(!level || level == 0) {
        return "Все без исключений"
    } else {
        let needPerms = ""
        level.forEach(elem => { needPerms=needPerms + permissions.get(elem) + ", " });
        return `Нужные права: "${needPerms.slice(0, -2)}"`
    }
}

module.exports = {
    parseMS: parseMS,
    getRandomInRange: getRandomInRange,
    securitylevel: securitylevel
}
