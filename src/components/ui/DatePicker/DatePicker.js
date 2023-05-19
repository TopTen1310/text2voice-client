import React, { useState, useRef, forwardRef, useEffect } from 'react'
import dayjs from 'dayjs'
import useControllableState from '../hooks/useControllableState'
import useMergedRef from '../hooks/useMergeRef'
import Calendar from './Calendar'
import BasePicker from './BasePicker'
import { useConfig } from '../ConfigProvider'
import capitalize from '../utils/capitalize'

const DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD'

const DatePicker = forwardRef((props, ref) => {
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
        inputtable,
        labelFormat,
        locale,
        maxDate,
        minDate,
        name,
        onBlur,
        onChange,
        onFocus,
        onDropdownClose,
        onDropdownOpen,
        openPickerOnClear,
        renderDay,
        size,
        style,
        type,
        value,
        weekendDays,
        yearLabelFormat,
        ...rest
    } = props

    const { locale: themeLocale } = useConfig()

    const finalLocale = locale || themeLocale

    const dateFormat =
        type === 'date'
            ? DEFAULT_INPUT_FORMAT
            : inputFormat || DEFAULT_INPUT_FORMAT

    const [dropdownOpened, setDropdownOpened] = useState(defaultOpen)

    const inputRef = useRef()

    const [lastValidValue, setLastValidValue] = useState(defaultValue ?? null)

    const [_value, setValue] = useControllableState({
        prop: value,
        defaultProp: defaultValue,
        onChange,
    })

    const [calendarMonth, setCalendarMonth] = useState(
        _value || defaultMonth || new Date()
    )

    const [focused, setFocused] = useState(false)

    const [inputState, setInputState] = useState(
        _value instanceof Date
            ? capitalize(dayjs(_value).locale(finalLocale).format(dateFormat))
            : ''
    )

    const closeDropdown = () => {
        setDropdownOpened(false)
        onDropdownClose?.()
    }

    const openDropdown = () => {
        setDropdownOpened(true)
        onDropdownOpen?.()
    }

    useEffect(() => {
        if (value === null && !focused) {
            setInputState('')
        }

        if (value instanceof Date && !focused) {
            setInputState(
                capitalize(dayjs(value).locale(finalLocale).format(dateFormat))
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, focused, themeLocale])

    useEffect(() => {
        if (defaultValue instanceof Date && inputState && !focused) {
            setInputState(
                capitalize(dayjs(_value).locale(finalLocale).format(dateFormat))
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeLocale])

    const handleValueChange = (date) => {
        setValue(date)
        setInputState(
            capitalize(dayjs(date).locale(finalLocale).format(dateFormat))
        )
        closePickerOnChange && closeDropdown()
        window.setTimeout(() => inputRef.current?.focus(), 0)
    }

    const handleClear = () => {
        setValue(null)
        setLastValidValue(null)
        setInputState('')
        openPickerOnClear && openDropdown()
        inputRef.current?.focus()
    }

    const parseDate = (date) => dayjs(date, dateFormat, finalLocale).toDate()

    const setDateFromInput = () => {
        let date = typeof _value === 'string' ? parseDate(_value) : _value

        if (maxDate && dayjs(date).isAfter(maxDate)) {
            date = maxDate
        }

        if (minDate && dayjs(date).isBefore(minDate)) {
            date = minDate
        }

        if (dayjs(date).isValid()) {
            setValue(date)
            setLastValidValue(date)
            setInputState(
                capitalize(dayjs(date).locale(finalLocale).format(dateFormat))
            )
            setCalendarMonth(date)
        } else {
            setValue(lastValidValue)
        }
    }

    const handleInputBlur = (event) => {
        typeof onBlur === 'function' && onBlur(event)
        setFocused(false)

        if (inputtable) {
            setDateFromInput()
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputtable) {
            closeDropdown()
            setDateFromInput()
        }
    }

    const handleInputFocus = (event) => {
        typeof onFocus === 'function' && onFocus(event)
        setFocused(true)
    }

    const handleChange = (event) => {
        openDropdown()

        const date = parseDate(event.target.value)
        if (dayjs(date).isValid()) {
            setValue(date)
            setLastValidValue(date)
            setInputState(event.target.value)
            setCalendarMonth(date)
        } else {
            setInputState(event.target.value)
        }
    }

    return (
        <BasePicker
            inputtable={inputtable}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
            ref={useMergedRef(ref, inputRef)}
            size={size}
            style={style}
            className={className}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            name={name}
            inputLabel={inputState}
            clearable={
                type === 'date' ? false : clearable && !!_value && !disabled
            }
            clearButton={clearButton}
            onClear={handleClear}
            disabled={disabled}
            onDropdownClose={onDropdownClose}
            onDropdownOpen={onDropdownOpen}
            type={type}
            inputPrefix={inputPrefix}
            inputSuffix={inputSuffix}
            {...rest}
        >
            <Calendar
                locale={finalLocale}
                month={inputtable ? calendarMonth : undefined}
                defaultMonth={
                    defaultMonth ||
                    (_value instanceof Date ? _value : new Date())
                }
                onMonthChange={setCalendarMonth}
                value={
                    _value instanceof Date
                        ? _value
                        : _value && dayjs(_value).toDate()
                }
                onChange={handleValueChange}
                labelFormat={labelFormat}
                dayClassName={dayClassName}
                dayStyle={dayStyle}
                disableOutOfMonth={disableOutOfMonth}
                minDate={minDate}
                maxDate={maxDate}
                disableDate={disableDate}
                firstDayOfWeek={firstDayOfWeek}
                preventFocus={inputtable}
                dateViewCount={dateViewCount}
                enableHeaderLabel={enableHeaderLabel}
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

DatePicker.defaultProps = {
    closePickerOnChange: true,
    labelFormat: {
        month: 'MMM',
        year: 'YYYY',
    },
    defaultOpen: false,
    name: 'date',
    clearable: true,
    disabled: false,
    firstDayOfWeek: 'monday',
    openPickerOnClear: false,
}

export default DatePicker
