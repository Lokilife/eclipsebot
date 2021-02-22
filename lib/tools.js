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



module.exports = {
    enumerate: enumerate,
    digitToEmoji: digitToEmoji
}
