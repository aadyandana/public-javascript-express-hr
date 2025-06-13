const isWeekday = (date) => {
    const dayOfWeek = new Date(date).getDay();

    return dayOfWeek >= 1 && dayOfWeek <= 5;
}

module.exports = { isWeekday };