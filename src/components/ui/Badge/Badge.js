import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Badge = React.forwardRef((props, ref) => {
    const {
        content,
        maxCount,
        className,
        innerClass,
        children,
        badgeStyle,
        ...rest
    } = props

    const dot = typeof content !== 'number' && typeof content !== 'string'

    const badgeClass = classNames(dot ? 'badge-dot' : 'badge', innerClass)

    const renderBadge = () => {
        if (children) {
            return (
                <span
                    className={classNames('badge-wrapper', className)}
                    ref={ref}
                    {...rest}
                >
                    <span
                        className={classNames(badgeClass, 'badge-inner')}
                        style={badgeStyle}
                    >
                        {typeof content === 'number' && content > maxCount
                            ? `${maxCount}+`
                            : content}
                    </span>
                    {children}
                </span>
            )
        }
        return (
            <span
                className={classNames(badgeClass, className)}
                ref={ref}
                style={badgeStyle}
                {...rest}
            >
                {content}
            </span>
        )
    }

    return renderBadge()
})

Badge.defaultProps = {
    maxCount: 99,
}

Badge.propTypes = {
    innerClass: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxCount: PropTypes.number,
    badgeStyle: PropTypes.object,
}

export default Badge
