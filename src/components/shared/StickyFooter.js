import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const StickyFooter = (props) => {
    const { children, className, stickyClass, ...rest } = props

    const [isSticky, setIsSticky] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const cachedRef = ref.current
        const observer = new IntersectionObserver(
            ([e]) => setIsSticky(e.intersectionRatio < 1),
            {
                threshold: [1],
            }
        )

        observer.observe(cachedRef)

        return function () {
            observer.unobserve(cachedRef)
        }
    }, [])

    return (
        <div
            className={classNames(
                'sticky -bottom-1',
                className,
                isSticky && stickyClass
            )}
            ref={ref}
            {...rest}
        >
            {children}
        </div>
    )
}

StickyFooter.propTypes = {
    stickyClass: PropTypes.string,
}

export default StickyFooter
