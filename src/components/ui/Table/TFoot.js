import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const TFoot = forwardRef((props, ref) => {
    const { children, className, asElement: Component, ...rest } = props

    const tBodyClass = classNames(Component !== 'tfoot' && 'tfoot', className)

    return (
        <Component className={tBodyClass} {...rest} ref={ref}>
            {children}
        </Component>
    )
})

TFoot.propTypes = {
    asElement: PropTypes.string,
}

TFoot.defaultProps = {
    asElement: 'tfoot',
}

export default TFoot
