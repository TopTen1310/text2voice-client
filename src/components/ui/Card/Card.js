import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useConfig } from '../ConfigProvider'

const Card = React.forwardRef((props, ref) => {
    const { cardBordered } = useConfig()

    const {
        children,
        className,
        clickable,
        onClick,
        bordered = cardBordered || false,
        bodyClass,
        header,
        headerClass,
        headerBorder,
        headerExtra,
        footer,
        footerClass,
        footerBorder,
        ...rest
    } = props

    const cardClass = classNames(
        'card',
        className,
        bordered ? `card-border` : `card-shadow`,
        clickable && 'cursor-pointer user-select-none'
    )

    const cardBodyClasss = classNames('card-body', bodyClass)
    const cardHeaderClass = classNames(
        'card-header',
        headerBorder && 'card-header-border',
        headerExtra && 'card-header-extra',
        headerClass
    )
    const cardFooterClass = classNames(
        'card-footer',
        footerBorder && `card-footer-border`,
        footerClass
    )

    const renderHeader = () => {
        if (typeof header === 'string') {
            return <h4>{header}</h4>
        }
        return <>{header}</>
    }

    const onCardClick = (e) => {
        onClick?.(e)
    }

    return (
        <div className={cardClass} ref={ref} {...rest} onClick={onCardClick}>
            {header && (
                <div className={cardHeaderClass}>
                    {renderHeader()}
                    {headerExtra && <span>{headerExtra}</span>}
                </div>
            )}
            <div className={cardBodyClasss}>{children}</div>
            {footer && <div className={cardFooterClass}>{footer}</div>}
        </div>
    )
})

Card.propTypes = {
    bordered: PropTypes.bool,
    clickable: PropTypes.bool,
    bodyClass: PropTypes.string,
    headerClass: PropTypes.string,
    footerClass: PropTypes.string,
    headerBorder: PropTypes.bool,
    footerBorder: PropTypes.bool,
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    onClick: PropTypes.func,
}

Card.defaultProps = {
    clickable: false,
    headerBorder: true,
    footerBorder: true,
}

export default Card
