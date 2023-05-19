import dayjs from 'dayjs'

export function formatYear(year, format) {
    return dayjs(new Date(year, 1, 1)).format(format)
}
