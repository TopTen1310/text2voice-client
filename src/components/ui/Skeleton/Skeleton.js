import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Skeleton = React.forwardRef((props, ref) => {
    const {
        animation,
        asElement: Component,
        className,
        height,
        style,
        variant,
        width,
    } = props

    return (
        <Component
            ref={ref}
            className={classNames(
                'skeleton',
                variant === 'circle' && 'skeleton-circle',
                variant === 'block' && 'skeleton-block',
                animation && 'animate-pulse',
                className
            )}
            style={{
                width,
                height,
                ...style,
            }}
        />
    )
})

Skeleton.defaultProps = {
    asElement: 'span',
    variant: 'block',
    animation: true,
}

Skeleton.propTypes = {
    asElement: PropTypes.string,
    variant: PropTypes.oneOfType([
        PropTypes.oneOf(['circle', 'block']),
        PropTypes.string,
    ]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Skeleton
