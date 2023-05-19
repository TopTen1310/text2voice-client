import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Tag = forwardRef((props, ref) => {
    const {
        className,
        children,
        prefix,
        suffix,
        prefixClass,
        suffixClass,
        rest,
    } = props

    return (
        <div className={classNames('tag', className)} ref={ref} {...rest}>
            {prefix && typeof prefix === 'boolean' && (
                <span
                    className={classNames('tag-affix tag-prefix', prefixClass)}
                />
            )}
            {typeof prefix === 'object' && prefix}
            {children}
            {suffix && typeof suffix === 'boolean' && (
                <span
                    className={classNames('tag-affix tag-suffix', suffixClass)}
                />
            )}
            {typeof suffix === 'object' && suffix}
        </div>
    )
})

Tag.defaultProps = {
    prefix: false,
    suffix: false,
}

Tag.propTypes = {
    prefix: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    suffix: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    prefixClass: PropTypes.string,
}

export default Tag
