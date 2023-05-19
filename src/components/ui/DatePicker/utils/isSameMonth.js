export function isSameMonth(date, comparison) {
    return (
        date.getFullYear() === comparison.getFullYear() &&
        date.getMonth() === comparison.getMonth()
    )
}
