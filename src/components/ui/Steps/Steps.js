import React, { forwardRef, Children } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { STEPS_STATUS } from '../utils/constant'
import mapCloneElement from '../utils/mapCloneElement'

const { COMPLETE, PENDING, IN_PROGRESS, ERROR } = STEPS_STATUS

const Steps = forwardRef((props, ref) => {
    const {
        className,
        children,
        vertical,
        current,
        status,
        onChange,
        ...rest
    } = props

    const count = Children.count(children)

    const items = mapCloneElement(children, (item, index) => {
        const itemStyles = {
            flexBasis: index < count - 1 ? `${100 / (count - 1)}%` : undefined,
            maxWidth: index === count - 1 ? `${100 / count}%` : undefined,
        }
        const itemProps = {
            stepNumber: index + 1,
            status: PENDING,
            style: !vertical ? itemStyles : undefined,
            isLast: index === count - 1,
            vertical: vertical,
            onStepChange: onChange ? () => onChange(index) : undefined,
            ...item.props,
        }

        if (status === ERROR && index === current - 1) {
            itemProps.className = classNames('steps-item-error')
        }

        if (!item.props.status) {
            if (index === current) {
                itemProps.status = status
                itemProps.className = classNames(
                    itemProps.className,
                    'steps-item-active'
                )
            } else if (index < current) {
                itemProps.status = COMPLETE
            }
        }
        return itemProps
    })

    return (
        <div
            ref={ref}
            className={classNames(
                'steps',
                vertical && 'steps-vertical',
                className
            )}
            {...rest}
        >
            {items}
        </div>
    )
})

Steps.defaultProps = {
    vertical: false,
    status: IN_PROGRESS,
    current: 0,
}

Steps.propTypes = {
    vertical: PropTypes.bool,
    current: PropTypes.number,
    status: PropTypes.oneOf([COMPLETE, PENDING, IN_PROGRESS, ERROR]),
}

export default Steps
