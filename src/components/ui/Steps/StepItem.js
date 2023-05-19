import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { HiCheck, HiX } from 'react-icons/hi'
import { STEPS_STATUS } from '../utils/constant'

const { COMPLETE, PENDING, IN_PROGRESS, ERROR } = STEPS_STATUS

const STEP_STATUS_ICON = {
    [COMPLETE]: <HiCheck />,
    [PENDING]: null,
    [IN_PROGRESS]: null,
    [ERROR]: <HiX />,
}

const StepItem = forwardRef((props, ref) => {
    const {
        className,
        status,
        customIcon,
        stepNumber,
        description,
        title,
        isLast,
        vertical,
        onStepChange,
        ...rest
    } = props

    const { themeColor, primaryColorLevel } = useConfig()

    const color = `${themeColor}-${primaryColorLevel}`

    let stepIcon = <span>{STEP_STATUS_ICON[status] ?? stepNumber}</span>

    if (customIcon) {
        stepIcon = <span>{customIcon}</span>
    }

    const stepItemClass = classNames(
        `step-item step-item-${status}`,
        vertical && 'step-item-vertical',
        className
    )

    const stepWrapperClass = classNames(
        'step-item-wrapper',
        onStepChange && 'step-clickable'
    )

    const stepIconClass = classNames(
        `step-item-icon step-item-icon-${status}`,
        status === COMPLETE && `bg-${color} text-white`,
        status === ERROR && `step-item-icon-error`,
        status === IN_PROGRESS &&
            `text-${color} dark:text-gray-100 border-${color} step-item-icon-current`
    )

    const stepConnectClass = classNames(
        'step-connect',
        vertical && 'step-connect-vertical',
        status === COMPLETE ? `bg-${color}` : `inactive`
    )

    const stepTitleClass = classNames(
        'step-item-title',
        status === ERROR && `step-item-title-error`,
        onStepChange && status !== ERROR && `hover:text-${color}`
    )

    const handleStepChange = () => {
        onStepChange?.()
    }

    return (
        <div
            className={stepItemClass}
            {...rest}
            ref={ref}
            onClick={handleStepChange}
        >
            <div className={stepWrapperClass}>
                <div className={stepIconClass}>{stepIcon}</div>
                {title && (
                    <div className="step-item-content">
                        {title && (
                            <span className={stepTitleClass}>{title}</span>
                        )}
                        {description && vertical && (
                            <span className="step-item-description">
                                {description}
                            </span>
                        )}
                    </div>
                )}
            </div>
            {!isLast && <div className={stepConnectClass} />}
        </div>
    )
})

StepItem.propTypes = {
    vertical: PropTypes.bool,
    stepNumber: PropTypes.number,
    status: PropTypes.oneOf([COMPLETE, PENDING, IN_PROGRESS, ERROR]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    customIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    isLast: PropTypes.bool,
}

export default StepItem
