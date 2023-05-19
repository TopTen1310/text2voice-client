import React, { useState, useCallback, useMemo, useEffect } from 'react'
import classNames from 'classnames'
import { CheckboxGroupContextProvider } from './context'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'
import remove from 'lodash/remove'
import shallowEqual from '../utils/shallowEqual'

const Group = React.forwardRef((props, ref) => {
    const {
        value: valueProp,
        className,
        onChange,
        color,
        vertical,
        name,
        children,
        ...rest
    } = props

    const [value, setValue] = useState(valueProp)

    const onCheckboxGroupChange = useCallback(
        (itemValue, itemChecked, event) => {
            const nextValue = cloneDeep(value) || []
            if (itemChecked) {
                nextValue.push(itemValue)
            } else {
                remove(nextValue, (i) => shallowEqual(i, itemValue))
            }

            setValue(nextValue)
            onChange?.(nextValue, event)
        },
        [onChange, setValue, value]
    )

    useEffect(() => {
        setValue(valueProp)
    }, [valueProp])

    const checkboxGroupDefaultClass = `inline-flex ${
        vertical ? 'flex-col gap-y-2' : ''
    }`

    const checkBoxGroupClass = classNames(checkboxGroupDefaultClass, className)

    const contextValue = useMemo(
        () => ({
            vertical,
            name,
            value,
            color,
            onChange: onCheckboxGroupChange,
        }),
        [vertical, onCheckboxGroupChange, name, color, value]
    )

    return (
        <CheckboxGroupContextProvider value={contextValue}>
            <div ref={ref} className={checkBoxGroupClass} {...rest}>
                {children}
            </div>
        </CheckboxGroupContextProvider>
    )
})

Group.defaultProps = {
    vertical: false,
}

Group.propTypes = {
    vertical: PropTypes.bool,
    color: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string),
    ]),
    onChange: PropTypes.func,
}

export default Group
