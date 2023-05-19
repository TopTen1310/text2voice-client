import React, { useState, useRef, forwardRef } from 'react'
import useUniqueId from '../hooks/useUniqueId'
import useMergedRef from '../hooks/useMergeRef'
import useDidUpdate from '../hooks/useDidUpdate'
import TimeInput from './TimeInput'
import CloseButton from '../CloseButton'
import { HiOutlineClock } from 'react-icons/hi'
import Input from '../Input'

const TimeInputRange = forwardRef((props, ref) => {
    const {
        invalid,
        className,
        style,
        size,
        id,
        value,
        defaultValue,
        onChange,
        showSeconds,
        clearable,
        format,
        amLabel,
        pmLabel,
        name,
        timeFieldPlaceholder,
        amPmPlaceholder,
        seperator,
        disabled,
        nextRef,
        field,
        form,
        timeFieldClass,
        prefix,
        suffix = <HiOutlineClock className="text-lg" />,
        ...rest
    } = props

    const uuid = useUniqueId(id)

    const fromTimeRef = useRef()
    const toTimeRef = useRef()
    const [_value, setValue] = useState(value ?? defaultValue)

    useDidUpdate(() => {
        typeof onChange === 'function' && onChange(_value)
    }, [_value])

    useDidUpdate(() => {
        if (
            value[0]?.getTime() !== _value[0]?.getTime() ||
            value[1]?.getTime() !== _value[1]?.getTime()
        ) {
            setValue(value)
        }
    }, [value])

    const handleClear = () => {
        setValue([null, null])
        fromTimeRef.current?.focus()
    }

    const suffixSlot =
        clearable && _value ? (
            <CloseButton onClick={handleClear} />
        ) : (
            <>{suffix}</>
        )

    const forwardProps = {
        amPmPlaceholder,
        disabled,
        format,
        size,
        timeFieldPlaceholder,
        showSeconds,
    }

    return (
        <Input
            asElement="div"
            invalid={invalid}
            onClick={() => {
                fromTimeRef.current?.focus()
            }}
            size={size}
            className={className}
            style={style}
            disabled={disabled}
            suffix={suffixSlot}
            prefix={prefix}
            {...rest}
        >
            <div className="time-input-wrapper">
                <TimeInput
                    unstyle
                    ref={useMergedRef(fromTimeRef, ref)}
                    value={_value[0]}
                    onChange={(date) => setValue([date, _value[1]])}
                    name={name}
                    nextRef={toTimeRef}
                    id={uuid}
                    clearable={false}
                    suffix={null}
                    {...forwardProps}
                />

                <span className="time-input-separator">{seperator}</span>

                <TimeInput
                    unstyle
                    ref={toTimeRef}
                    value={_value[1]}
                    onChange={(date) => setValue([_value[0], date])}
                    clearable={false}
                    suffix={null}
                    {...forwardProps}
                />
            </div>
        </Input>
    )
})

TimeInputRange.defaultProps = {
    defaultValue: [null, null],
    showSeconds: false,
    clearable: false,
    format: '24',
    timeFieldPlaceholder: '--',
    amPmPlaceholder: 'am',
    seperator: '~',
    disabled: false,
}

export default TimeInputRange
