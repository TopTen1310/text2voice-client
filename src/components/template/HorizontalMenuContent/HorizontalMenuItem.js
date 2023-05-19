import React from 'react'
import navigationIcon from 'configs/navigation-icon.config'
import { MenuItem } from 'components/ui'
import HorizontalMenuNavLink from './HorizontalMenuNavLink'
import { useTranslation } from 'react-i18next'

const HorizontalMenuItem = ({ nav, isLink, manuVariant }) => {
    const { title, translateKey, icon, path } = nav

    const { t } = useTranslation()

    const itemTitle = t(translateKey, title)

    return (
        <MenuItem variant={manuVariant}>
            {icon && <span className="text-2xl">{navigationIcon[icon]}</span>}
            {path && isLink ? (
                <HorizontalMenuNavLink path={path}>
                    {itemTitle}
                </HorizontalMenuNavLink>
            ) : (
                <span>{itemTitle}</span>
            )}
        </MenuItem>
    )
}

export default HorizontalMenuItem
