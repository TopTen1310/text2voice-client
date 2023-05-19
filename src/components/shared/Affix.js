import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Affix(props) {
    const { offset = 0, className, children } = props

    const ref = React.createRef()
    let prevStyle = {
        position: '',
        top: '',
        width: '',
    }

    const checkPosition = (distanceToBody, width) => {
        const scrollTop = window.scrollY

        if (distanceToBody - scrollTop < offset) {
            if (ref.current.style.position !== 'fixed') {
                for (let key in prevStyle) {
                    prevStyle[key] = ref.current.style[key]
                }
                ref.current.style.position = 'fixed'
                ref.current.style.width = width + 'px'
                ref.current.style.top = offset + 'px'
            }
        } else {
            for (let key in prevStyle) {
                ref.current.style[key] = prevStyle[key]
            }
        }
    }

    useEffect(() => {
        if (typeof window.scrollY === 'undefined') {
            return
        }

        const distanceToBody =
            window.scrollY + ref.current.getBoundingClientRect().top
        const handleScroll = () => {
            if (!ref.current) {
                return
            }

            requestAnimationFrame(() => {
                checkPosition(distanceToBody, ref.current.clientWidth)
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <div ref={ref} className={classNames('z-10', className)}>
            {children}
        </div>
    )
}

Affix.propTypes = {
    offset: PropTypes.number,
}

export default Affix
