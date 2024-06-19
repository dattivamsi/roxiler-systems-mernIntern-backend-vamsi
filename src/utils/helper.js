// src/utils/helper.js
function getMonthNumber(monthName) {
    if(monthName){
        const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        return monthNames.indexOf(monthName.toLowerCase()) + 1;
    }
}

module.exports = {
    getMonthNumber,
};
