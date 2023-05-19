import React from 'react'
import classNames from 'classnames'
import Button from '../../Buttons'
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi'

const Header = (props) => {
    const {
        hasNext,
        hasPrevious,
        onNext,
        onPrevious,
        onNextLevel,
        className,
        label,
        nextLevelDisabled,
        style,
        nextLabel,
        previousLabel,
        preventLevelFocus = false,
        renderCenter = false,
        preventFocus,
        children,
        ...rest
    } = props

    const headerLabel = (
        <button
            className="picker-header-label"
            disabled={nextLevelDisabled}
            onClick={onNextLevel}
            tabIndex={preventLevelFocus ? -1 : 0}
            onMouseDown={(event) => preventFocus && event.preventDefault()}
            type="button"
        >
            {label}
        </button>
    )

    const renderChildren = children ? children : headerLabel

    return (
        <div
            className="picker-header flex items-center justify-between mb-2"
            {...rest}
        >
            {!renderCenter && renderChildren}
            <div
                className={classNames(
                    renderCenter && 'justify-between w-full',
                    'flex items-center rtl:flex-row-reverse'
                )}
            >
                <Button
                    type="button"
                    variant="plain"
                    className={classNames(
                        !hasPrevious &&
                            renderCenter &&
                            'opacity-0 cursor-default'
                    )}
                    size="sm"
                    icon={<HiChevronLeft />}
                    disabled={!hasPrevious}
                    onClick={onPrevious}
                    aria-label={previousLabel}
                    onMouseDown={(event) =>
                        preventFocus && event.preventDefault()
                    }
                />
                {renderCenter && renderChildren}
                <Button
                    type="button"
                    variant="plain"
                    className={classNames(
                        !hasNext && renderCenter && 'opacity-0 cursor-default'
                    )}
                    size="sm"
                    icon={<HiChevronRight />}
                    disabled={!hasNext}
                    onClick={onNext}
                    aria-label={nextLabel}
                    onMouseDown={(event) =>
                        preventFocus && event.preventDefault()
                    }
                />
            </div>
        </div>
    )
}

export default Header
