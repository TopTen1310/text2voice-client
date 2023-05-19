import React, { useMemo, forwardRef } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import Day from './Day'
import getDayProps from './props/getDayProps'
import { isSameDate, getWeekdaysNames, getMonthDays } from '../../utils'
import { useConfig } from '../../../ConfigProvider'

const noop = () => false

const Month = forwardRef((props, ref) => {
    const {
        className,
        month,
        value,
        onChange,
        disableOutOfMonth,
        locale,
        dayClassName,
        dayStyle,
        styles,
        minDate,
        maxDate,
        disableDate,
        onDayMouseEnter,
        range,
        hideWeekdays,
        fullWidth,
        preventFocus,
        focusable,
        firstDayOfWeek,
        onDayKeyDown,
        daysRefs,
        hideOutOfMonthDates,
        isDateInRange = noop,
        isDateFirstInRange = noop,
        isDateLastInRange = noop,
        renderDay,
        weekdayLabelFormat,
        weekendDays,
        ...rest
    } = props

    const { locale: themeLocale } = useConfig()

    const finalLocale = locale || themeLocale
    const days = getMonthDays(month, firstDayOfWeek)

    const weekdays = getWeekdaysNames(
        finalLocale,
        firstDayOfWeek,
        weekdayLabelFormat
    ).map((weekday) => (
        <th className="week-day-cell" key={weekday}>
            <span className="week-day-cell-content">{weekday}</span>
        </th>
    ))

    const hasValue = Array.isArray(value)
        ? value.every((item) => item instanceof Date)
        : value instanceof Date

    const hasValueInMonthRange =
        value instanceof Date &&
        dayjs(value).isAfter(dayjs(month).startOf('month')) &&
        dayjs(value).isBefore(dayjs(month).endOf('month'))

    const firstIncludedDay = useMemo(
        () =>
            days
                .flatMap((_) => _)
                .find((date) => {
                    const dayProps = getDayProps({
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
                    })

                    return !dayProps.disabled && !dayProps.outOfMonth
                }) || dayjs(month).startOf('month').toDate(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const rows = days.map((row, rowIndex) => {
        const cells = row.map((date, cellIndex) => {
            const dayProps = getDayProps({
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
            })

            const onKeyDownPayload = { rowIndex, cellIndex, date }

            return (
                <td className={classNames('date-picker-cell')} key={cellIndex}>
                    <Day
                        ref={(button) => {
                            if (daysRefs) {
                                if (!Array.isArray(daysRefs[rowIndex])) {
                                    daysRefs[rowIndex] = []
                                }
                                daysRefs[rowIndex][cellIndex] = button
                            }
                        }}
                        onClick={() =>
                            typeof onChange === 'function' && onChange(date)
                        }
                        onMouseDown={(event) =>
                            preventFocus && event.preventDefault()
                        }
                        outOfMonth={dayProps.outOfMonth}
                        weekend={dayProps.weekend}
                        inRange={
                            dayProps.inRange || isDateInRange(date, dayProps)
                        }
                        firstInRange={
                            dayProps.firstInRange ||
                            isDateFirstInRange(date, dayProps)
                        }
                        lastInRange={
                            dayProps.lastInRange ||
                            isDateLastInRange(date, dayProps)
                        }
                        firstInMonth={isSameDate(date, firstIncludedDay)}
                        selected={dayProps.selected || dayProps.selectedInRange}
                        hasValue={hasValueInMonthRange}
                        onKeyDown={(event) =>
                            typeof onDayKeyDown === 'function' &&
                            onDayKeyDown(onKeyDownPayload, event)
                        }
                        className={
                            typeof dayClassName === 'function'
                                ? dayClassName(date, dayProps)
                                : null
                        }
                        style={
                            typeof dayStyle === 'function'
                                ? dayStyle(date, dayProps)
                                : null
                        }
                        disabled={dayProps.disabled}
                        onMouseEnter={
                            typeof onDayMouseEnter === 'function'
                                ? onDayMouseEnter
                                : noop
                        }
                        fullWidth={fullWidth}
                        focusable={focusable}
                        hideOutOfMonthDates={hideOutOfMonthDates}
                        styles={styles}
                        renderDay={renderDay}
                        isToday={isSameDate(date, new Date())}
                        value={date}
                    />
                </td>
            )
        })

        return (
            <tr className={classNames('date-picker-week-cell')} key={rowIndex}>
                {cells}
            </tr>
        )
    })

    return (
        <table
            className={classNames('picker-table', className)}
            ref={ref}
            cellSpacing="0"
            {...rest}
        >
            {!hideWeekdays && (
                <thead>
                    <tr>{weekdays}</tr>
                </thead>
            )}
            <tbody>{rows}</tbody>
        </table>
    )
})

Month.defaultProps = {
    disableOutOfMonth: false,
    hideWeekdays: false,
    size: 'sm',
    fullWidth: false,
    preventFocus: false,
    focusable: true,
    firstDayOfWeek: 'monday',
    hideOutOfMonthDates: false,
    weekendDays: [0, 6],
}

export default Month
