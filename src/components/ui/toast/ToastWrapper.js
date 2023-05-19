import React, {
    useState,
    useImperativeHandle,
    useRef,
    useCallback,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import chainedFunction from '../utils/chainedFunction'
import { motion } from 'framer-motion'
import { getPlacementTransition } from './transition'
import { PLACEMENT } from '../utils/constant'
import { createRoot } from 'react-dom/client'

const useMessages = (msgKey) => {
    const [messages, setMessages] = useState([])

    const getKey = useCallback(
        (key) => {
            if (typeof key === 'undefined' && messages.length) {
                key = messages[messages.length - 1].key
            }
            return key
        },
        [messages]
    )

    const push = useCallback(
        (message) => {
            const key = msgKey || '_' + Math.random().toString(36).substr(2, 12)
            setMessages([...messages, { key, visible: true, node: message }])
            return key
        },
        [messages, msgKey]
    )

    const removeAll = useCallback(() => {
        setMessages(messages.map((msg) => ({ ...msg, visible: false })))
        setTimeout(() => {
            setMessages([])
        }, 50)
    }, [messages])

    const remove = useCallback(
        (key) => {
            setMessages(
                messages.map((elm) => {
                    if (elm.key === getKey(key)) {
                        elm.visible = false
                    }
                    return elm
                })
            )

            setTimeout(() => {
                setMessages(messages.filter((msg) => msg.visible))
            }, 50)
        },
        [messages, getKey]
    )

    return { messages, push, removeAll, remove }
}

const ToastWrapper = React.forwardRef((props, ref) => {
    const rootRef = useRef()

    const {
        transitionType,
        placement,
        offsetX,
        offsetY,
        messageKey,
        block,
        callback,
        ...rest
    } = props

    const { push, removeAll, remove, messages } = useMessages(messageKey)

    useImperativeHandle(ref, () => {
        return { root: rootRef.current, push, removeAll, remove }
    })

    const placementTransition = getPlacementTransition({
        offsetX,
        offsetY,
        placement,
        transitionType,
    })

    const toastProps = {
        triggerByToast: true,
        ...rest,
    }

    const messageElements = messages.map((item) => {
        return (
            <motion.div
                key={item.key}
                className={'toast-wrapper'}
                initial={placementTransition.variants.initial}
                variants={placementTransition.variants}
                animate={item.visible ? 'animate' : 'exit'}
                transition={{ duration: 0.15, type: 'tween' }}
            >
                {React.cloneElement(item.node, {
                    ...toastProps,
                    ref,
                    onClose: chainedFunction(item.node?.props?.onClose, () =>
                        remove(item.key)
                    ),
                    className: classNames(item.node?.props?.className),
                })}
            </motion.div>
        )
    })

    return (
        <div
            style={placementTransition.default}
            {...rest}
            ref={(thisRef) => {
                rootRef.current = thisRef
                callback?.(thisRef)
            }}
            className={classNames('toast', block && 'w-full')}
        >
            {messageElements}
        </div>
    )
})

ToastWrapper.getInstance = (props) => {
    const { wrapper, ...rest } = props

    const wrapperRef = React.createRef()

    const wrapperElement =
        (typeof wrapper === 'function' ? wrapper() : wrapper) || document.body

    return new Promise((resolve) => {
        const renderCallback = () => {
            resolve([wrapperRef, unmount])
        }

        function renderElement(element) {
            const mountElement = document.createElement('div')

            wrapperElement.appendChild(mountElement)

            const root = createRoot(mountElement)

            root.render(element)

            wrapperElement.__root = root

            return root
        }
        const { unmount } = renderElement(
            <ToastWrapper
                {...rest}
                ref={wrapperRef}
                callback={renderCallback}
            />
        )
    })
}

const {
    TOP_START,
    TOP_CENTER,
    TOP_END,
    BOTTOM_START,
    BOTTOM_CENTER,
    BOTTOM_END,
} = PLACEMENT

export const toastDefaultProps = {
    placement: TOP_END,
    offsetX: 30,
    offsetY: 30,
    transitionType: 'scale',
    block: false,
}

ToastWrapper.defaultProps = toastDefaultProps

ToastWrapper.propTypes = {
    placement: PropTypes.oneOf([
        TOP_START,
        TOP_CENTER,
        TOP_END,
        BOTTOM_START,
        BOTTOM_CENTER,
        BOTTOM_END,
    ]),
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    transitionType: PropTypes.oneOf(['scale', 'fade']),
    block: PropTypes.bool,
}

export default ToastWrapper
