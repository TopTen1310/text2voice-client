import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { useTabs } from './context'
import useCallbackRef from '../hooks/useCallbackRef'
import { useConfig } from '../ConfigProvider'
import PropTypes from 'prop-types'

const TabNav = forwardRef((props, ref) => {
    const {
        value: valueProp,
        disabled,
        className,
        icon,
        children,
        ...rest
    } = props

    const { value, onValueChange, variant } = useTabs()
    const isSelected = valueProp === value

    const { themeColor, primaryColorLevel } = useConfig()

    const onTabNavClick = useCallbackRef(() => {
        if (!isSelected && !disabled) {
            onValueChange(valueProp)
        }
    })

    const color = `${themeColor}-${primaryColorLevel}`

    const tabNavClass = classNames(
        'tab-nav',
        `tab-nav-${variant}`,
        isSelected &&
            `tab-nav-active text-${color} dark:text-${themeColor}-100`,
        isSelected && variant === 'underline' && `border-${color}`,
        isSelected &&
            variant === 'pill' &&
            `bg-${themeColor}-50 dark:bg-${color} dark:text-gray-100`,
        disabled && 'tab-nav-disabled',
        !disabled &&
            !isSelected &&
            `hover:text-${color} dark:hover:text-${themeColor}-100`,
        className
    )

    return (
        <div
            className={tabNavClass}
            role="tab"
            aria-selected={isSelected}
            ref={ref}
            onClick={onTabNavClick}
            {...rest}
        >
            {icon && <div className="tab-nav-icon">{icon}</div>}
            {children}
        </div>
    )
})

TabNav.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default TabNav
