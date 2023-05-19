import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { useTabs } from './context'
import PropTypes from 'prop-types'

const TabContent = forwardRef((props, ref) => {
    const { value, children, className, ...rest } = props

    const context = useTabs()
    const isSelected = value === context.value

    const tabContentClass = classNames(
        'tab-content',
        isSelected && 'tab-content-active',
        className
    )

    return (
        <div
            role="tabpanel"
            tabIndex={0}
            className={tabContentClass}
            ref={ref}
            {...rest}
        >
            {isSelected && children}
        </div>
    )
})

TabContent.propTypes = {
    value: PropTypes.string.isRequired,
}

export default TabContent
