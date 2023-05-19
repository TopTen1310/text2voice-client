export default function isWeekend(date, weekendDays = [0, 6]) {
    return weekendDays.includes(date.getDay())
}
