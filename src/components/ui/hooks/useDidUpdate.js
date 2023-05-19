import { useEffect, useRef } from 'react'

export default function useDidUpdate(callback, dependencies) {
    const mounted = useRef(false)

    useEffect(
        () => () => {
            mounted.current = false
        },
        []
    )

    useEffect(() => {
        if (mounted.current) {
            return callback()
        }

        mounted.current = true
        return undefined
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)
}
