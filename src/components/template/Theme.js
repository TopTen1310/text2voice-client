import React from 'react'
import { useSelector } from 'react-redux'
import { ConfigProvider } from 'components/ui'
import useDarkMode from 'utils/hooks/useDarkMode'
import { themeConfig } from 'configs/theme.config'

const Theme = (props) => {
    const theme = useSelector((state) => state.theme)
    const locale = useSelector((state) => state.locale.currentLang)
    const [isDark] = useDarkMode()

    const currentTheme = {
        mode: isDark ? 'dark' : 'light',
        ...themeConfig,
        ...theme,
        ...{ locale },
    }

    return (
        <ConfigProvider value={currentTheme}>{props.children}</ConfigProvider>
    )
}

export default Theme
