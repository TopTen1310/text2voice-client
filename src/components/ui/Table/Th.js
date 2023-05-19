import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Th = React.forwardRef((props, ref) => {
    const { children, className, asElement: Component, ...rest } = props

    const thClass = classNames(Component !== 'th' && 'th', className)

    return (
        <Component className={thClass} {...rest} ref={ref}>
            {children}
        </Component>
    )
})

Th.propTypes = {
    asElement: PropTypes.string,
}

Th.defaultProps = {
    asElement: 'th',
}

export default Th
