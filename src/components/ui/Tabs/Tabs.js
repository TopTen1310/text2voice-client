import React, { forwardRef } from 'react'
import { TabsContextProvider } from './context'
import useControllableState from '../hooks/useControllableState'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Tabs = forwardRef((props, ref) => {
    const {
        value: valueProp,
        onChange,
        defaultValue,
        variant,
        className,
        ...rest
    } = props

    const [value, setValue] = useControllableState({
        prop: valueProp,
        onChange: onChange,
        defaultProp: defaultValue,
    })

    const tabsClass = classNames('tabs', className)

    return (
        <TabsContextProvider
            value={{
                value: value,
                onValueChange: setValue,
                variant,
            }}
        >
            <div className={tabsClass} {...rest} ref={ref} />
        </TabsContextProvider>
    )
})

Tabs.defaultProps = {
    variant: 'underline',
}

Tabs.propTypes = {
    variant: PropTypes.oneOf(['underline', 'pill']),
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default Tabs
