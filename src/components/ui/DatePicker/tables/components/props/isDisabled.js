import dayjs from 'dayjs'

export default function isDisabled({
    minDate,
    maxDate,
    disableDate,
    disableOutOfMonth,
    date,
    outOfMonth,
}) {
    const isAfterMax =
        maxDate instanceof Date && dayjs(maxDate).isBefore(date, 'day')
    const isBeforeMin =
        minDate instanceof Date && dayjs(minDate).isAfter(date, 'day')
    const shouldExclude = typeof disableDate === 'function' && disableDate(date)
    const disabledOutside = !!disableOutOfMonth && !!outOfMonth
    return isAfterMax || isBeforeMin || shouldExclude || disabledOutside
}
