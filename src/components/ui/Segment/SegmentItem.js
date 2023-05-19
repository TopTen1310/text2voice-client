import { forwardRef, useCallback, useContext } from 'react'
import classNames from 'classnames'
import { useSegment } from './context'
import { CONTROL_SIZES, SIZES } from '../utils/constant'
import SegmentContext from './context'
import PropTypes from 'prop-types'

const unwrapArray = (arg) => (Array.isArray(arg) ? arg[0] : arg)

const SegmentItem = forwardRef((props, ref) => {
    const { size } = useContext(SegmentContext)

    const { value: valueProp, children, className, disabled, ...rest } = props

    const {
        value: valueContext,
        onActive,
        onDeactivate,
        selectionType,
    } = useSegment()

    const active = valueContext.includes(valueProp)

    const getSegmentSize = useCallback(() => {
        let sizeClass = ''
        switch (size) {
            case SIZES.LG:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.lg} md:px-8 py-2 px-4 text-base`
                )
                break
            case SIZES.SM:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.sm} px-3 py-2 text-sm`
                )
                break
            case SIZES.XS:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.xs} px-3 py-1 text-xs`
                )
                break
            default:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.md} md:px-8 py-2 px-4`
                )
                break
        }
        return sizeClass
    }, [size])

    const onSegmentItemClick = () => {
        if (!disabled) {
            if (!active) {
                if (selectionType === 'single') {
                    onActive([valueProp])
                }
                if (selectionType === 'multiple') {
                    const nextValue = [...valueContext, ...[valueProp]]
                    onActive(nextValue)
                }
            } else if (selectionType === 'multiple') {
                onDeactivate(valueProp)
            }
        }
    }

    const childrenProps = {
        ref: ref,
        active,
        onSegmentItemClick,
        disabled,
        value: valueProp,
        ...rest,
    }

    return typeof children === 'function' ? (
        unwrapArray(children)(childrenProps)
    ) : (
        <button
            className={classNames(
                'segment-item segment-item-default',
                active && 'segment-item-active',
                disabled && 'segment-item-disabled',
                getSegmentSize(),
                className
            )}
            onClick={onSegmentItemClick}
            {...rest}
        >
            {children}
        </button>
    )
})

SegmentItem.defaultProps = {
    disabled: false,
}

SegmentItem.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
}

export default SegmentItem
