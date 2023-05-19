import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { THEME_ENUM } from 'constants/theme.constant'
import { setMode } from 'store/theme/themeSlice'

function useDarkMode() {
    const mode = useSelector((state) => state.theme.mode)
    const { MODE_DARK, MODE_LIGHT } = THEME_ENUM

    const isEnabled = mode === MODE_DARK

    const dispatch = useDispatch()
    const onModeChange = (mode) => dispatch(setMode(mode))

    useEffect(() => {
        if (window === undefined) {
            return
        }
        const root = window.document.documentElement
        root.classList.remove(isEnabled ? MODE_LIGHT : MODE_DARK)
        root.classList.add(isEnabled ? MODE_DARK : MODE_LIGHT)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled])

    return [isEnabled, onModeChange]
}

export default useDarkMode
