import React, { useState, useRef, forwardRef } from 'react'
import dayjs from 'dayjs'
import useControllableState from '../hooks/useControllableState'
import useMergedRef from '../hooks/useMergeRef'
import capitalize from '../utils/capitalize'
import RangeCalendar from './RangeCalendar'
import BasePicker from './BasePicker'
import { useConfig } from '../ConfigProvider'

const validationRule = (val) =>
    Array.isArray(val) &&
    val.length === 2 &&
    val.every((v) => v instanceof Date)

const isFirstDateSet = (val) =>
    Array.isArray(val) && val.length === 2 && val[0] instanceof Date

const DatePickerRange = forwardRef((props, ref) => {
    const {
        className,
        clearable,
        clearButton,
        closePickerOnChange,
        dateViewCount,
        dayClassName,
        dayStyle,
        defaultMonth,
        defaultOpen,
        defaultValue,
        defaultView,
        disabled,
        disableDate,
        enableHeaderLabel,
        disableOutOfMonth,
        firstDayOfWeek,
        hideOutOfMonthDates,
        hideWeekdays,
        inputFormat,
        inputPrefix,
        inputSuffix,
        labelFormat,
        seperator,
        locale,
        maxDate,
        minDate,
        onChange,
        onDropdownClose,
        onDropdownOpen,
        openPickerOnClear,
        renderDay,
        singleDate,
        size,
        style,
        value,
        weekendDays,
        yearLabelFormat,
        ...rest
    } = props

    const { locale: themeLocale } = useConfig()

    const finalLocale = locale || themeLocale

    const dateFormat = inputFormat || 'YYYY-MM-DD'

    const [dropdownOpened, setDropdownOpened] = useState(defaultOpen)

    const inputRef = useRef()

    const [_value, setValue] = useControllableState({
        prop: value,
        defaultProp: defaultValue !== undefined ? defaultValue : [null, null],
        onChange,
    })

    const handleValueChange = (range) => {
        setValue(range)
        if (closePickerOnChange && validationRule(range)) {
            setDropdownOpened(false)
            onDropdownClose?.()
            window.setTimeout(() => inputRef.current?.focus(), 0)
        }
    }

    const valueValid = validationRule(_value)
    const firstValueValid = isFirstDateSet(_value)

    const firstDateLabel = _value[0]
        ? capitalize(dayjs(_value[0]).locale(finalLocale).format(dateFormat))
        : ''

    const secondDateLabel = _value[1]
        ? capitalize(dayjs(_value[1]).locale(finalLocale).format(dateFormat))
        : ''

    const handleClear = () => {
        setValue([null, null])
        setDropdownOpened(true)
        openPickerOnClear && onDropdownOpen?.()
        inputRef.current?.focus()
    }

    const handleDropdownToggle = (isOpened) => {
        if (!isOpened && firstValueValid && _value[1] === null) {
            handleClear()
        }
        setDropdownOpened(isOpened)
    }

    return (
        <BasePicker
            dropdownOpened={dropdownOpened}
            setDropdownOpened={handleDropdownToggle}
            ref={useMergedRef(ref, inputRef)}
            size={size}
            style={style}
            className={className}
            inputLabel={
                firstValueValid
                    ? `${firstDateLabel} ${seperator} ${secondDateLabel}`
                    : ''
            }
            clearable={clearable && firstValueValid}
            clearButton={clearButton}
            onClear={handleClear}
            dateViewCount={dateViewCount}
            onDropdownClose={onDropdownClose}
            onDropdownOpen={onDropdownOpen}
            disabled={disabled}
            inputPrefix={inputPrefix}
            inputSuffix={inputSuffix}
            {...rest}
        >
            <RangeCalendar
                locale={finalLocale}
                defaultMonth={valueValid ? _value[0] : defaultMonth}
                value={_value}
                onChange={handleValueChange}
                labelFormat={labelFormat}
                dayClassName={dayClassName}
                dayStyle={dayStyle}
                disableOutOfMonth={disableOutOfMonth}
                minDate={minDate}
                maxDate={maxDate}
                disableDate={disableDate}
                firstDayOfWeek={firstDayOfWeek}
                enableHeaderLabel={enableHeaderLabel}
                singleDate={singleDate}
                dateViewCount={dateViewCount}
                defaultView={defaultView}
                hideOutOfMonthDates={hideOutOfMonthDates}
                hideWeekdays={hideWeekdays}
                renderDay={renderDay}
                weekendDays={weekendDays}
                yearLabelFormat={yearLabelFormat}
            />
        </BasePicker>
    )
})

DatePickerRange.defaultProps = {
    closePickerOnChange: true,
    labelFormat: {
        month: 'MMM',
        year: 'YYYY',
    },
    defaultOpen: false,
    seperator: '~',
    clearable: true,
    firstDayOfWeek: 'monday',
    singleDate: false,
    dateViewCount: 1,
    openPickerOnClear: false,
}

export default DatePickerRange
