import ToastWrapper, { toastDefaultProps } from './ToastWrapper'

const defaultWrapperId = 'default'
const wrappers = new Map()

function castPlacment(placement) {
    if (/\top\b/.test(placement)) {
        return 'top-full'
    }

    if (/\bottom\b/.test(placement)) {
        return 'bottom-full'
    }
}

async function createWrapper(wrapperId, props) {
    const [wrapper] = await ToastWrapper.getInstance(props)

    wrappers.set(wrapperId || defaultWrapperId, wrapper)

    return wrapper
}

function getWrapper(wrapperId) {
    if (wrappers.size === 0) {
        return null
    }
    return wrappers.get(wrapperId || defaultWrapperId)
}

const toast = (message) => toast.push(message)

toast.push = (message, options = toastDefaultProps) => {
    let id = options.placement
    if (options.block) {
        id = castPlacment(options.placement)
    }

    let wrapper = getWrapper(id)

    if (wrapper?.current) {
        return wrapper.current.push(message)
    }

    return createWrapper(id ?? '', options).then((ref) => {
        return ref.current?.push(message)
    })
}

toast.remove = (key) => {
    wrappers.forEach((elm) => elm.current.remove(key))
}

toast.removeAll = () => {
    wrappers.forEach((elm) => elm.current.removeAll())
}

export default toast
