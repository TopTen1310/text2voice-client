import { Children, isValidElement, cloneElement } from 'react'

function map(children, func, context) {
    let index = 0
    return Children.map(children, (child) => {
        if (!isValidElement(child)) {
            return child
        }
        const handle = func.call(context, child, index)
        index += 1
        return handle
    })
}

function mapCloneElement(children, func, context) {
    return map(
        children,
        (child, index) =>
            cloneElement(child, {
                key: index,
                ...func(child, index),
            }),
        context
    )
}

export default mapCloneElement
