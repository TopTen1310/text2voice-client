import React, { useContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CheckboxGroupContext from './context'
import { useConfig } from '../ConfigProvider'

const Checkbox = React.forwardRef((props, ref) => {
    const {
        name: nameContext,
        value: groupValue,
        onChange: onGroupChange,
        color: colorContext,
    } = useContext(CheckboxGroupContext)

    const {
        color,
        className,
        onChange,
        children,
        disabled,
        readOnly,
        name = nameContext,
        defaultChecked,
        value,
        checked: controlledChecked,
        labelRef,
        field,
        ...rest
    } = props

    const { themeColor, primaryColorLevel } = useConfig()

    const isChecked = useCallback(() => {
        if (typeof groupValue !== 'undefined' && typeof value !== 'undefined') {
            return groupValue.some((i) => i === value)
        }
        return controlledChecked || defaultChecked
    }, [controlledChecked, groupValue, value, defaultChecked])

    const [checkboxChecked, setCheckboxChecked] = useState(isChecked())

    const getControlProps = () => {
        let checkedValue = checkboxChecked

        let groupChecked = { checked: checkedValue }
        let singleChecked = { value: checkedValue }

        if (controlledChecked !== 'undefined') {
            singleChecked.checked = controlledChecked
        }

        if (field) {
            checkedValue =
                typeof field.value === 'boolean' ? field.value : defaultChecked
            singleChecked = { value: checkedValue, checked: checkedValue }
        }

        if (typeof groupValue !== 'undefined') {
            groupChecked = { checked: groupValue.includes(value) }
        }

        if (defaultChecked) {
            singleChecked.defaultChecked = defaultChecked
        }
        return typeof groupValue !== 'undefined' ? groupChecked : singleChecked
    }

    const controlProps = getControlProps()

    const onCheckboxChange = useCallback(
        (e) => {
            let nextChecked = !checkboxChecked

            if (typeof groupValue !== 'undefined') {
                nextChecked = !groupValue.includes(value)
            }

            if (disabled || readOnly) {
                return
            }

            setCheckboxChecked(nextChecked)
            onChange?.(nextChecked, e)
            onGroupChange?.(value, nextChecked, e)
        },
        [
            checkboxChecked,
            disabled,
            readOnly,
            setCheckboxChecked,
            onChange,
            value,
            onGroupChange,
            groupValue,
        ]
    )

    const checkboxColor =
        color || colorContext || `${themeColor}-${primaryColorLevel}`

    const checkboxDefaultClass = `checkbox text-${checkboxColor}`
    const checkboxColorClass = disabled && 'disabled'
    const labelDefaultClass = `checkbox-label`
    const labelDisabledClass = disabled && 'disabled'

    const checkBoxClass = classNames(checkboxDefaultClass, checkboxColorClass)

    const labelClass = classNames(
        labelDefaultClass,
        labelDisabledClass,
        className
    )

    return (
        <label ref={labelRef} className={labelClass}>
            <input
                ref={ref}
                className={checkBoxClass}
                type="checkbox"
                disabled={disabled}
                readOnly={readOnly}
                onChange={onCheckboxChange}
                name={name}
                {...controlProps}
                {...field}
                {...rest}
            />
            {children ? (
                <span
                    className={classNames(
                        'ltr:ml-2 rtl:mr-2',
                        disabled ? 'opacity-50' : ''
                    )}
                >
                    {children}
                </span>
            ) : null}
        </label>
    )
})

Checkbox.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    color: PropTypes.string,
    onChange: PropTypes.func,
    labelRef: PropTypes.string,
    value: PropTypes.any,
}

export default Checkbox
