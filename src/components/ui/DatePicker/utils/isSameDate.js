import { isSameMonth } from './isSameMonth'

export function isSameDate(date, comparison) {
    return (
        isSameMonth(date, comparison) && date.getDate() === comparison.getDate()
    )
}
