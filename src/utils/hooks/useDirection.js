import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDirection } from 'store/theme/themeSlice'

function useDirection() {
    const direction = useSelector((state) => state.theme.direction)

    const dispatch = useDispatch()
    const updateDirection = (dir) => dispatch(setDirection(dir))

    useEffect(() => {
        if (window === undefined) {
            return
        }
        const root = window.document.documentElement
        root.setAttribute('dir', direction)
    }, [direction])

    return [direction, updateDirection]
}

export default useDirection
