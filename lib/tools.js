/**
 * 
 * @param {Array<?>} array
 * @returns {Array<Array<?>>}
 */
function enumerate(array) {
    let result = [];
    array.forEach((value, index)=>{
        result.push(`${index+1}. ${value}`);
    });
    return result;
}


/**
 * @param {String} digit
 */
function digitToEmoji(digit) {
    const emojis = new Map()
    .set("1", "1️⃣")
    .set("2", "2️⃣")
    .set("3", "3️⃣")
    .set("4", "4️⃣")
    .set("5", "5️⃣")
    .set("6", "6️⃣")
    .set("7", "7️⃣")
    .set("8", "8️⃣")
    .set("9", "9️⃣")
    .set("0", "0️⃣")
    return emojis.get(digit);
}

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

module.exports = {
    enumerate: enumerate,
    digitToEmoji: digitToEmoji,
    parseMS: parseMS
}
