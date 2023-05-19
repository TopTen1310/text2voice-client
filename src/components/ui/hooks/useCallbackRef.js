import { useRef, useEffect, useMemo } from 'react'

function useCallbackRef(cb) {
    const cbRef = useRef(cb)

    useEffect(() => {
        cbRef.current = cb
    })

    return useMemo(
        () =>
            (...args) =>
                cbRef.current?.(...args),
        []
    )
}

export default useCallbackRef
