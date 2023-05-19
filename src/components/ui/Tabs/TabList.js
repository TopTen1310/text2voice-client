import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { useTabs } from './context'

const TabList = forwardRef((props, ref) => {
    const { className, children, ...rest } = props

    const { variant } = useTabs()

    const tabListClass = classNames(
        'tab-list',
        `tab-list-${variant}`,
        className
    )

    return (
        <div role="tablist" className={tabListClass} ref={ref} {...rest}>
            {children}
        </div>
    )
})

export default TabList
