import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const TimeLineItem = forwardRef((props, ref) => {
    const { children, className, isLast, media } = props

    return (
        <li
            className={classNames(
                'timeline-item',
                isLast ? 'timeline-item-last' : '',
                className
            )}
            ref={ref}
        >
            <div className="timeline-item-wrapper">
                <div className="timeline-item-media">
                    <div className="timeline-item-media-content">
                        {media || (
                            <div className="timeline-item-media-default" />
                        )}
                    </div>
                    {!isLast && <div className="timeline-connect" />}
                </div>
                <div
                    className={classNames(
                        'timeline-item-content',
                        isLast && 'timeline-item-content-last'
                    )}
                >
                    {children}
                </div>
            </div>
        </li>
    )
})

TimeLineItem.propTypes = {
    media: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
}

export default TimeLineItem
