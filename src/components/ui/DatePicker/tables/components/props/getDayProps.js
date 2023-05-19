import { isSameDate } from '../../../utils'
import isWeekend from './isWeekend'
import isOutside from './isOutside'
import isDisabled from './isDisabled'
import getRangeProps from './getRangeProps'

export default function getDayProps(props) {
    const {
        date,
        month,
        hasValue,
        minDate,
        maxDate,
        value,
        disableDate,
        disableOutOfMonth,
        range,
        weekendDays,
    } = props

    const outOfMonth = isOutside(date, month)
    const selected =
        hasValue &&
        (Array.isArray(value)
            ? value.some((val) => isSameDate(val, date))
            : isSameDate(date, value))
    const { inRange, lastInRange, firstInRange, selectedInRange } =
        getRangeProps(date, range)

    return {
        disabled: isDisabled({
            minDate,
            maxDate,
            disableDate,
            disableOutOfMonth,
            date,
            outOfMonth,
        }),
        weekend: isWeekend(date, weekendDays),
        selectedInRange,
        selected,
        inRange,
        firstInRange,
        lastInRange,
        outOfMonth,
    }
}
