import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useTimeout from '../hooks/useTimeout'
import CloseButton from '../CloseButton'
import StatusIcon from '../StatusIcon'

const Notification = React.forwardRef((props, ref) => {
    const {
        duration,
        onClose,
        type,
        title,
        closable,
        className,
        children,
        width,
        customIcon,
        triggerByToast,
        style,
        ...rest
    } = props

    const [display, setDisplay] = useState('show')

    const { clear } = useTimeout(onClose, duration, duration > 0)

    const handleClose = useCallback(
        (e) => {
            setDisplay('hiding')
            onClose?.(e)
            clear()
            if (!triggerByToast) {
                setTimeout(() => {
                    setDisplay('hide')
                }, 400)
            }
        },
        [onClose, clear, triggerByToast]
    )

    const notificationClass = classNames('notification', className)

    if (display === 'hide') {
        return null
    }

    return (
        <div
            ref={ref}
            {...rest}
            className={notificationClass}
            style={{ width: width, ...style }}
        >
            <div
                className={classNames(
                    'notification-content',
                    !children && 'no-child'
                )}
            >
                {type && !customIcon ? (
                    <div className="mr-3">
                        <StatusIcon type={type} />
                    </div>
                ) : null}
                {customIcon && <div className="mr-3">{customIcon}</div>}
                <div className="mr-4">
                    {title && (
                        <div
                            className={classNames(
                                'notification-title',
                                children && 'mb-1'
                            )}
                        >
                            {title}
                        </div>
                    )}
                    <div className="notification-description">
                        {typeof children === 'function' ? children() : children}
                    </div>
                </div>
            </div>
            {closable && (
                <CloseButton
                    className="notification-close"
                    defaultStyle={false}
                    absolute={true}
                    onClick={handleClose}
                />
            )}
        </div>
    )
})

Notification.propTypes = {
    duration: PropTypes.number,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
    title: PropTypes.node,
    closable: PropTypes.bool,
    width: PropTypes.number,
    customIcon: PropTypes.node,
}

Notification.defaultProps = {
    duration: 3000,
    width: 350,
    closable: false,
    triggerByToast: false,
}

export default Notification
