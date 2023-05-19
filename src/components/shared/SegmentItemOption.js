import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useThemeClass from 'utils/hooks/useThemeClass'
import { HiCheckCircle } from 'react-icons/hi'

const SegmentItemOption = forwardRef((props, ref) => {
    const {
        active,
        children,
        className,
        customCheck,
        defaultGutter,
        disabled,
        hoverable,
        onSegmentItemClick,
    } = props

    const { textTheme, borderTheme, ringTheme } = useThemeClass()

    return (
        <div
            ref={ref}
            className={classNames(
                'flex',
                !customCheck && 'justify-between',
                'items-center',
                'border',
                'rounded-md ',
                'border-gray-200 dark:border-gray-600',
                defaultGutter && 'py-5 px-4',
                'cursor-pointer',
                'select-none',
                'w-100',
                active && `ring-1 ${ringTheme} ${borderTheme}`,
                hoverable &&
                    `hover:ring-1 hover:${ringTheme} hover:${borderTheme}`,
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            onClick={onSegmentItemClick}
        >
            {children}
            {active && !customCheck && (
                <HiCheckCircle className={classNames(textTheme, 'text-2xl')} />
            )}
            {active && customCheck}
        </div>
    )
})

SegmentItemOption.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    hoverable: PropTypes.bool,
    defaultGutter: PropTypes.bool,
    customCheck: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

SegmentItemOption.defaultProps = {
    defaultGutter: true,
}

export default SegmentItemOption
