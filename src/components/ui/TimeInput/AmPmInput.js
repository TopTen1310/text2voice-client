import React, { useRef, forwardRef } from 'react'
import classNames from 'classnames'
import useMergedRef from '../hooks/useMergeRef'

const AmPmInput = forwardRef((props, ref) => {
    const {
        className,
        onChange,
        onFocus,
        value,
        unstyled,
        amLabel,
        pmLabel,
        ...rest
    } = props

    const inputRef = useRef()

    const handleClick = (event) => {
        event.stopPropagation()
        inputRef.current.select()
    }

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault()
            onChange(value === amLabel ? pmLabel : amLabel, true)
        }
    }

    const handleFocus = (event) => {
        typeof onFocus === 'function' && onFocus(event)
        inputRef.current.select()
    }

    const handleChange = (event) => {
        const lastInputVal = event.target.value.slice(-1).toLowerCase()

        if (lastInputVal === 'p') {
            event.preventDefault()
            onChange(pmLabel, true)
            return
        }

        if (lastInputVal === 'a') {
            event.preventDefault()
            onChange(amLabel, true)
            return
        }

        onChange(value.toString(), true)
    }

    return (
        <input
            type="text"
            ref={useMergedRef(inputRef, ref)}
            onClick={handleClick}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={value}
            className={classNames('time-input-field', 'am-pm-input', className)}
            {...rest}
        />
    )
})

export default AmPmInput
