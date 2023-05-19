import React from 'react'
import classNames from 'classnames'
import { SIZES } from '../utils/constant'

const Line = (props) => {
    const { percent, size, children, strokeColor } = props

    const progressBackgroundClass = classNames(
        'progress-bg',
        size === SIZES.SM ? 'h-1.5' : 'h-2',
        `bg-${strokeColor}`
    )

    return (
        <>
            <div className="progress-wrapper">
                <div className="progress-inner">
                    <div
                        className={progressBackgroundClass}
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
            {children}
        </>
    )
}

export default Line
