import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const TBody = forwardRef((props, ref) => {
    const { children, className, asElement: Component, ...rest } = props

    const tBodyClass = classNames(Component !== 'tbody' && 'tbody', className)

    return (
        <Component className={tBodyClass} {...rest} ref={ref}>
            {children}
        </Component>
    )
})

TBody.propTypes = {
    asElement: PropTypes.string,
}

TBody.defaultProps = {
    asElement: 'tbody',
}

export default TBody
