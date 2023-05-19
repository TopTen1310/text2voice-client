import dayjs from 'dayjs'
import { getStartOfWeek } from './getStartOfWeek'

export function getWeekdaysNames(
    locale,
    firstDayOfWeek = 'monday',
    format = 'dd'
) {
    const names = []
    const date = getStartOfWeek(new Date(), firstDayOfWeek)

    for (let i = 0; i < 7; i += 1) {
        names.push(dayjs(date).locale(locale).format(format))
        date.setDate(date.getDate() + 1)
    }

    return names
}
