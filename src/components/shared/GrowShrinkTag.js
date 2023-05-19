import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Tag } from 'components/ui'
import { HiArrowUp, HiArrowDown } from 'react-icons/hi'
import growShrinkColor from 'utils/growShrinkColor'

const GrowShrinkTag = forwardRef((props, ref) => {
    const { value, className, prefix, suffix, showIcon } = props

    return (
        <Tag
            ref={ref}
            className={classNames(
                'gap-1 font-bold border-0',
                growShrinkColor(value, 'text'),
                growShrinkColor(value, 'bg'),
                className
            )}
        >
            {value !== 0 && (
                <span>
                    {showIcon && (value > 0 ? <HiArrowUp /> : <HiArrowDown />)}
                </span>
            )}
            <span>
                {prefix}
                {value}
                {suffix}
            </span>
        </Tag>
    )
})

GrowShrinkTag.defaultProps = {
    value: 0,
    showIcon: true,
}

GrowShrinkTag.propTypes = {
    value: PropTypes.number,
    showIcon: PropTypes.bool,
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default GrowShrinkTag
