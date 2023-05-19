import { forwardRef, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import useControllableState from '../hooks/useControllableState'
import useMergedRef from '../hooks/useMergeRef'
import capitalize from '../utils/capitalize'
import TimeInput from '../TimeInput'
import Calendar from './Calendar'
import BasePicker from './BasePicker'
import Button from '../Buttons'
import { useConfig } from '../ConfigProvider'

const DEFAULT_INPUT_FORMAT = 'DD-MMM-YYYY hh:mm a'

const DateTimepicker = forwardRef((props, ref) => {
    const {
        amPm,
        className,
        clearable,
        clearButtonLabel,
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
        okButtonContent,
        onBlur,
        onChange,
        onFocus,
        onDropdownClose,
        onDropdownOpen,
        openPickerOnClear,
        renderDay,
        size,
        style,
        value,
        weekendDays,
        yearLabelFormat,
        ...rest
    } = props

    const { locale: themeLocale } = useConfig()

    const finalLocale = locale || themeLocale

    const dateFormat = inputFormat || DEFAULT_INPUT_FORMAT

    const [dropdownOpened, setDropdownOpened] = useState(defaultOpen)

    const inputRef = useRef()

    // eslint-disable-next-line no-unused-vars
    const [_, setLastValidValue] = useState(defaultValue ?? null)
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
            setInputState(dayjs(value).locale(finalLocale).format(dateFormat))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, focused])

    const handleValueChange = (date) => {
        if (_value) {
            date.setHours(_value.getHours())
            date.setMinutes(_value.getMinutes())
        } else {
            const now = new Date(Date.now())
            date.setHours(now.getHours())
            date.setMinutes(now.getMinutes())
        }
        setValue(date)
        if (!value && !closePickerOnChange) {
            setInputState(dayjs(date).locale(finalLocale).format(dateFormat))
        }
        closePickerOnChange &&
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
        onChange?.(null)
    }

    const parseDate = (date) => dayjs(date, dateFormat, finalLocale).toDate()

    const handleInputBlur = (e) => {
        typeof onBlur === 'function' && onBlur(e)
        setFocused(false)
    }

    const handleInputFocus = (e) => {
        typeof onFocus === 'function' && onFocus(e)
        setFocused(true)
    }

    const handleChange = (e) => {
        openDropdown()

        const date = parseDate(e.target.value)
        if (dayjs(date).isValid()) {
            setValue(date)
            setLastValidValue(date)
            closePickerOnChange && setInputState(e.target.value)
            setCalendarMonth(date)
        } else {
            closePickerOnChange && setInputState(e.target.value)
        }
    }

    const handleTimeChange = (time) => {
        const newDateTime = new Date(
            _value.getFullYear(),
            _value.getMonth(),
            _value.getDate(),
            time.getHours(),
            time.getMinutes(),
            time.getSeconds(),
            time.getMilliseconds()
        )
        setValue(newDateTime)

        if (!value && !closePickerOnChange) {
            setInputState(
                capitalize(
                    dayjs(newDateTime).locale(finalLocale).format(dateFormat)
                )
            )
        }

        closePickerOnChange &&
            setInputState(
                capitalize(
                    dayjs(newDateTime).locale(finalLocale).format(dateFormat)
                )
            )
        closePickerOnChange && closeDropdown()
    }

    const handleOk = () => {
        setInputState(
            capitalize(dayjs(_value).locale(finalLocale).format(dateFormat))
        )
        closeDropdown()
        window.setTimeout(() => inputRef.current?.focus(), 0)
        onChange?.(_value)
    }

    return (
        <BasePicker
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
            ref={useMergedRef(ref, inputRef)}
            className={className}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            name={name}
            inputLabel={inputState}
            clearable={clearable && !!_value && !disabled}
            clearButtonLabel={clearButtonLabel}
            onClear={handleClear}
            disabled={disabled}
            size={size}
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
                preventFocus={false}
                dateViewCount={dateViewCount}
                enableHeaderLabel={enableHeaderLabel}
                defaultView={defaultView}
                hideOutOfMonthDates={hideOutOfMonthDates}
                hideWeekdays={hideWeekdays}
                renderDay={renderDay}
                weekendDays={weekendDays}
                yearLabelFormat={yearLabelFormat}
            />
            <div className="flex items-center gap-4 mt-4">
                <TimeInput
                    disabled={!_value}
                    value={_value}
                    onChange={handleTimeChange}
                    format={amPm ? '12' : '24'}
                    clearable={false}
                    size="sm"
                />
                <Button size="sm" disabled={!_value} onClick={handleOk}>
                    {okButtonContent}
                </Button>
            </div>
        </BasePicker>
    )
})

DateTimepicker.defaultProps = {
    closePickerOnChange: false,
    labelFormat: {
        month: 'MMM',
        year: 'YYYY',
    },
    defaultOpen: false,
    name: 'dateTime',
    clearable: true,
    disabled: false,
    firstDayOfWeek: 'monday',
    okButtonContent: 'OK',
    amPm: true,
}

export default DateTimepicker
