import React, { useState } from 'react'
import {
    NAV_MODE_THEMED,
    SPLITTED_SIDE_NAV_MINI_WIDTH,
    SPLITTED_SIDE_NAV_SECONDARY_WIDTH,
    DIR_LTR,
    DIR_RTL,
    NAV_MODE_TRANSPARENT,
} from 'constants/theme.constant'
import StackedSideNavMini from './StackedSideNavMini'
import StackedSideNavSecondary from './StackedSideNavSecondary'
import useResponsive from 'utils/hooks/useResponsive'
import isEmpty from 'lodash/isEmpty'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const stackedSideNavDefaultStyle = {
    width: SPLITTED_SIDE_NAV_MINI_WIDTH,
}

const StackedSideNav = () => {
    const { t } = useTranslation()

    const [selectedMenu, setSelectedMenu] = useState({})
    const [activeKeys, setActiveKeys] = useState()

    const themeColor = useSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useSelector(
        (state) => state.theme.primaryColorLevel
    )
    const navMode = useSelector((state) => state.theme.navMode)
    const mode = useSelector((state) => state.theme.mode)
    const direction = useSelector((state) => state.theme.direction)
    const currentRouteKey = useSelector(
        (state) => state.base.common.currentRouteKey
    )
    const userAuthority = useSelector((state) => state.auth.user.authority)

    const { larger } = useResponsive()

    const navColor = (navType, mode, ableTheme = true) => {
        if (navMode === NAV_MODE_THEMED && ableTheme) {
            return `bg-${themeColor}-${primaryColorLevel} ${navType}-${mode}`
        }
        return `${navType}-${mode}`
    }

    const handleChange = (selected) => {
        setSelectedMenu(selected)
    }

    const handleCollpase = () => {
        setSelectedMenu({})
        setActiveKeys([])
    }

    const handleSetActiveKey = (key) => {
        setActiveKeys(key)
    }

    const stackedSideNavSecondaryDirStyle = () => {
        let style = {}
        const marginValue = `${-SPLITTED_SIDE_NAV_SECONDARY_WIDTH}px`
        if (direction === DIR_LTR) {
            style = { marginLeft: marginValue }
        }

        if (direction === DIR_RTL) {
            style = { marginRight: marginValue }
        }

        return style
    }

    return (
        <>
            {larger.md && (
                <div className={`stacked-side-nav`}>
                    <StackedSideNavMini
                        className={`stacked-side-nav-mini ${navColor(
                            'stacked-side-nav-mini',
                            navMode
                        )}`}
                        style={stackedSideNavDefaultStyle}
                        routeKey={currentRouteKey}
                        activeKeys={activeKeys}
                        navMode={navMode}
                        onChange={handleChange}
                        onSetActiveKey={handleSetActiveKey}
                        userAuthority={userAuthority}
                        mode={mode}
                        direction={direction}
                    />
                    <div
                        className={`stacked-side-nav-secondary ${navColor(
                            'stacked-side-nav-secondary',
                            mode,
                            false
                        )}`}
                        style={{
                            width: SPLITTED_SIDE_NAV_SECONDARY_WIDTH,
                            ...(isEmpty(selectedMenu)
                                ? stackedSideNavSecondaryDirStyle()
                                : {}),
                        }}
                    >
                        {!isEmpty(selectedMenu) && (
                            <StackedSideNavSecondary
                                title={t(
                                    selectedMenu.translateKey,
                                    selectedMenu.title
                                )}
                                menu={selectedMenu.menu}
                                routeKey={currentRouteKey}
                                navMode={NAV_MODE_TRANSPARENT}
                                onCollapse={handleCollpase}
                                direction={direction}
                                userAuthority={userAuthority}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default StackedSideNav
