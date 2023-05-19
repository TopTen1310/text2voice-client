import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const IconText = ({ className, asElement: Component, icon, children }) => {
    return (
        <Component className={classNames('flex items-center gap-2', className)}>
            {icon}
            {children}
        </Component>
    )
}

IconText.defaultProps = {
    asElement: 'span',
}

IconText.propTypes = {
    asElement: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default IconText
