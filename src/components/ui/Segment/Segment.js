import React, { forwardRef, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { SegmentContextProvider } from './context'
import useControllableState from '../hooks/useControllableState'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { useConfig } from '../ConfigProvider'

const Segment = forwardRef((props, ref) => {
    const {
        value: valueProp,
        defaultValue,
        onChange = () => {},
        children,
        className,
        selectionType,
        size,
        ...rest
    } = props

    const formControl = useForm()
    const inputGroupControl = useInputGroup()
    const { controlSize } = useConfig()

    const [value, setValue] = useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onChange,
        selectionType,
    })

    const onActive = useCallback(
        (itemValue) => {
            setValue(itemValue)
        },
        [setValue]
    )

    const onDeactivate = useCallback(
        (itemValue) => {
            if (selectionType === 'single') {
                setValue('')
            }

            if (selectionType === 'multiple') {
                setValue((prevValue = []) => {
                    return prevValue.filter((value) => value !== itemValue)
                })
            }
        },
        [setValue, selectionType]
    )

    const segmentValue = useMemo(() => {
        if (selectionType === 'single') {
            if (value && typeof value === 'string') {
                return [value]
            }

            if (value && Array.isArray(value)) {
                return value
            }

            return []
        }

        if (selectionType === 'multiple') {
            return value ? value : []
        }
    }, [selectionType, value])

    return (
        <SegmentContextProvider
            value={{
                value: segmentValue,
                onActive: onActive,
                onDeactivate: onDeactivate,
                size:
                    size ||
                    inputGroupControl?.size ||
                    formControl?.size ||
                    controlSize,
                selectionType,
            }}
        >
            <div
                ref={ref}
                className={classNames('segment', className)}
                {...rest}
            >
                {children}
            </div>
        </SegmentContextProvider>
    )
})

Segment.defaultProps = {
    selectionType: 'single',
}

Segment.propTypes = {
    selectionType: PropTypes.oneOf(['single', 'multiple']),
    value: PropTypes.arrayOf(PropTypes.string),
    defaultValue: PropTypes.arrayOf(PropTypes.string),
}

export default Segment
