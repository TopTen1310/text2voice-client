import React, { useRef, useState, forwardRef } from 'react'
import classNames from 'classnames'
import useControllableState from '../hooks/useControllableState'
import { useConfig } from '../ConfigProvider'
import DateTable from './tables/DateTable'
import MonthTable from './tables/MonthTable'
import YearTable from './tables/YearTable'

const CalendarBase = forwardRef((props, ref) => {
    const {
        className,
        dateViewCount = 1,
        dayClassName,
        dayStyle,
        defaultMonth,
        defaultView = 'date',
        disableDate,
        disableOutOfMonth,
        enableHeaderLabel = true,
        firstDayOfWeek = 'monday',
        hideOutOfMonthDates,
        hideWeekdays,
        isDateFirstInRange,
        isDateInRange,
        isDateLastInRange,
        labelFormat = 'MMMM YYYY',
        locale,
        maxDate,
        minDate,
        month,
        monthLabelFormat = 'MMM',
        onChange,
        onDayMouseEnter,
        onMonthChange,
        paginateBy = dateViewCount,
        preventFocus,
        range,
        renderDay,
        style,
        value,
        weekdayLabelFormat = 'dd',
        weekendDays,
        yearLabelFormat = 'YYYY',
        ...rest
    } = props

    const { locale: themeLocale } = useConfig()

    const [selectionState, setSelectionState] = useState(defaultView)

    const finalLocale = locale || themeLocale

    const daysRefs = useRef(
        Array(dateViewCount)
            .fill(0)
            .map(() => [])
    )

    const [_month, setMonth] = useControllableState({
        prop: month,
        defaultProp: defaultMonth !== undefined ? defaultMonth : new Date(),
        onChange: onMonthChange,
    })

    const [yearSelection, setYearSelection] = useState(_month.getFullYear())
    const [monthSelection, setMonthSelection] = useState(_month.getMonth())

    const minYear = minDate instanceof Date ? minDate.getFullYear() : 100
    const maxYear = maxDate instanceof Date ? maxDate.getFullYear() : 10000

    const daysPerRow = 6

    const focusOnNextFocusableDay = (direction, monthIndex, payload, n = 1) => {
        const changeRow = ['down', 'up'].includes(direction)

        const rowIndex = changeRow
            ? payload.rowIndex + (direction === 'down' ? n : -n)
            : payload.rowIndex

        const cellIndex = changeRow
            ? payload.cellIndex
            : payload.cellIndex + (direction === 'right' ? n : -n)

        const dayToFocus = daysRefs.current[monthIndex][rowIndex][cellIndex]

        if (!dayToFocus) {
            return
        }

        if (dayToFocus.disabled) {
            focusOnNextFocusableDay(direction, monthIndex, payload, n + 1)
        } else {
            dayToFocus.focus()
        }
    }

    const handleDayKeyDown = (monthIndex, payload, event) => {
        switch (event.key) {
            case 'ArrowDown': {
                event.preventDefault()

                const hasRowBelow =
                    payload.rowIndex + 1 < daysRefs.current[monthIndex].length
                if (hasRowBelow) {
                    focusOnNextFocusableDay('down', monthIndex, payload)
                }
                break
            }
            case 'ArrowUp': {
                event.preventDefault()

                const hasRowAbove = payload.rowIndex > 0
                if (hasRowAbove) {
                    focusOnNextFocusableDay('up', monthIndex, payload)
                }
                break
            }
            case 'ArrowRight': {
                event.preventDefault()

                const isNotLastCell = payload.cellIndex !== daysPerRow
                if (isNotLastCell) {
                    focusOnNextFocusableDay('right', monthIndex, payload)
                } else if (monthIndex + 1 < dateViewCount) {
                    if (daysRefs.current[monthIndex + 1][payload.rowIndex]) {
                        daysRefs.current[monthIndex + 1][
                            payload.rowIndex
                        ][0]?.focus()
                    }
                }
                break
            }
            case 'ArrowLeft': {
                event.preventDefault()

                if (payload.cellIndex !== 0) {
                    focusOnNextFocusableDay('left', monthIndex, payload)
                } else if (monthIndex > 0) {
                    if (daysRefs.current[monthIndex - 1][payload.rowIndex]) {
                        daysRefs.current[monthIndex - 1][payload.rowIndex][
                            daysPerRow
                        ].focus()
                    }
                }
                break
            }
            default:
                break
        }
    }

    return (
        <div className={classNames('picker-view', className)} {...rest}>
            {selectionState === 'year' && (
                <YearTable
                    value={yearSelection}
                    minYear={minYear}
                    maxYear={maxYear}
                    onChange={(year) => {
                        setMonth(new Date(year, monthSelection, 1))
                        setYearSelection(year)
                        setSelectionState('date')
                    }}
                    className={className}
                    preventFocus={preventFocus}
                    yearLabelFormat={yearLabelFormat}
                />
            )}
            {selectionState === 'month' && (
                <MonthTable
                    value={{
                        month: _month.getMonth(),
                        year: _month.getFullYear(),
                    }}
                    year={yearSelection}
                    onYearChange={setYearSelection}
                    onNextLevel={() => setSelectionState('year')}
                    locale={finalLocale}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={(monthValue) => {
                        setMonth(new Date(yearSelection, monthValue, 1))
                        setMonthSelection(monthValue)
                        setSelectionState('date')
                    }}
                    className={className}
                    style={style}
                    preventFocus={preventFocus}
                    yearLabelFormat={yearLabelFormat}
                    monthLabelFormat={monthLabelFormat}
                />
            )}
            {selectionState === 'date' && (
                <DateTable
                    dateViewCount={dateViewCount}
                    paginateBy={paginateBy}
                    month={_month}
                    locale={finalLocale}
                    minDate={minDate}
                    maxDate={maxDate}
                    enableHeaderLabel={enableHeaderLabel}
                    daysRefs={daysRefs}
                    onMonthChange={setMonth}
                    onNextLevel={(view) => setSelectionState(view)}
                    onDayKeyDown={handleDayKeyDown}
                    style={style}
                    dayClassName={dayClassName}
                    dayStyle={dayStyle}
                    disableOutOfMonth={disableOutOfMonth}
                    disableDate={disableDate}
                    hideWeekdays={hideWeekdays}
                    preventFocus={preventFocus}
                    firstDayOfWeek={firstDayOfWeek}
                    value={value}
                    range={range}
                    onChange={onChange}
                    labelFormat={labelFormat}
                    weekdayLabelFormat={weekdayLabelFormat}
                    onDayMouseEnter={onDayMouseEnter}
                    renderDay={renderDay}
                    hideOutOfMonthDates={hideOutOfMonthDates}
                    isDateInRange={isDateInRange}
                    isDateFirstInRange={isDateFirstInRange}
                    isDateLastInRange={isDateLastInRange}
                    weekendDays={weekendDays}
                />
            )}
        </div>
    )
})

export default CalendarBase
