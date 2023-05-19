import React, { useState, useRef, forwardRef } from 'react'
import useUniqueId from '../hooks/useUniqueId'
import useMergedRef from '../hooks/useMergeRef'
import useDidUpdate from '../hooks/useDidUpdate'
import TimeInputField from './TimeInputField'
import AmPmInput from './AmPmInput'
import CloseButton from '../CloseButton'
import Input from '../Input'
import {
    getTimeValues,
    getDate,
    createAmPmHandler,
    createTimeHandler,
} from './utils'
import { HiOutlineClock } from 'react-icons/hi'

const TimeInput = forwardRef((props, ref) => {
    const {
        amLabel,
        amPmPlaceholder,
        className,
        clearable,
        defaultValue,
        disabled,
        format,
        field,
        form,
        id,
        invalid,
        name,
        nextRef,
        onChange,
        pmLabel,
        prefix,
        showSeconds,
        size,
        style,
        suffix = <HiOutlineClock className="text-lg" />,
        timeFieldPlaceholder,
        timeFieldClass,
        value,
        ...rest
    } = props

    const uuid = useUniqueId(id)

    const hoursRef = useRef()
    const minutesRef = useRef()
    const secondsRef = useRef()
    const amPmRef = useRef()
    const [time, setTime] = useState(
        getTimeValues(value || defaultValue, format, amLabel, pmLabel)
    )
    const [_value, setValue] = useState(value || defaultValue)

    useDidUpdate(() => {
        setTime(getTimeValues(_value, format, amLabel, pmLabel))
    }, [_value, format, amLabel, pmLabel])

    useDidUpdate(() => {
        if (value?.getTime() !== _value?.getTime()) {
            setValue(value)
        }
    }, [value])

    const setDate = (change) => {
        const timeWithChange = { ...time, ...change }
        const newDate = getDate(
            timeWithChange.hours,
            timeWithChange.minutes,
            timeWithChange.seconds,
            format,
            pmLabel,
            timeWithChange.amPm
        )
        setValue(newDate)
        typeof onChange === 'function' && onChange(newDate)
    }

    const handleHoursChange = createTimeHandler({
        onChange: (val, carryOver) => {
            setDate({
                hours: val,
                minutes: carryOver ?? time.minutes,
            })
        },
        min: format === '12' ? 1 : 0,
        max: format === '12' ? 12 : 23,
        nextRef: minutesRef,
        nextMax: 59,
    })

    const handleMinutesChange = createTimeHandler({
        onChange: (val, carryOver) => {
            setDate({
                minutes: val,
                seconds: carryOver ?? time.seconds,
            })
        },
        min: 0,
        max: 59,
        nextRef: showSeconds ? secondsRef : format === '12' ? amPmRef : nextRef,
        nextMax: showSeconds ? 59 : undefined,
    })

    const handleSecondsChange = createTimeHandler({
        onChange: (val) => {
            setDate({ seconds: val })
        },
        min: 0,
        max: 59,
        nextRef: format === '12' ? amPmRef : nextRef,
    })

    const handleAmPmChange = createAmPmHandler({
        amLabel,
        pmLabel,
        onChange: (val) => {
            setDate({ amPm: val })
        },
        nextRef,
    })

    const handleClear = () => {
        setTime({ hours: '', minutes: '', seconds: '', amPm: '' })
        setValue(null)
        onChange?.(null)
        hoursRef.current.focus()
    }

    const suffixSlot =
        clearable && _value ? <CloseButton onClick={handleClear} /> : suffix

    return (
        <Input
            asElement="div"
            invalid={invalid}
            disabled={disabled}
            onClick={() => hoursRef.current.focus()}
            style={style}
            className={className}
            size={size}
            prefix={prefix}
            suffix={suffixSlot}
            field={field}
            form={form}
            {...rest}
        >
            <div className="time-input-wrapper">
                <TimeInputField
                    ref={useMergedRef(hoursRef, ref)}
                    value={time.hours}
                    onChange={handleHoursChange}
                    setValue={(val) =>
                        setTime((current) => ({ ...current, hours: val }))
                    }
                    id={uuid}
                    className={timeFieldClass}
                    withSeparator
                    size={size}
                    max={format === '12' ? 12 : 23}
                    placeholder={timeFieldPlaceholder}
                    aria-label="hours"
                    disabled={disabled}
                    name={name}
                />
                <TimeInputField
                    ref={minutesRef}
                    value={time.minutes}
                    onChange={handleMinutesChange}
                    setValue={(val) =>
                        setTime((current) => ({ ...current, minutes: val }))
                    }
                    className={timeFieldClass}
                    withSeparator={showSeconds}
                    size={size}
                    max={59}
                    placeholder={timeFieldPlaceholder}
                    aria-label="minutes"
                    disabled={disabled}
                />
                {showSeconds && (
                    <TimeInputField
                        ref={secondsRef}
                        value={time.seconds}
                        onChange={handleSecondsChange}
                        setValue={(val) =>
                            setTime((current) => ({ ...current, seconds: val }))
                        }
                        className={timeFieldClass}
                        size={size}
                        max={59}
                        placeholder={timeFieldPlaceholder}
                        aria-label="seconds"
                        disabled={disabled}
                    />
                )}
                {format === '12' && (
                    <AmPmInput
                        ref={amPmRef}
                        value={time.amPm}
                        onChange={handleAmPmChange}
                        placeholder={amPmPlaceholder}
                        amLabel={amLabel}
                        pmLabel={pmLabel}
                        size={size}
                        aria-label="am pm"
                        disabled={disabled}
                    />
                )}
            </div>
        </Input>
    )
})

TimeInput.defaultProps = {
    showSeconds: false,
    clearable: true,
    format: '24',
    amLabel: 'am',
    pmLabel: 'pm',
    timeFieldPlaceholder: '--',
    amPmPlaceholder: 'am',
    disabled: false,
}

export default TimeInput
