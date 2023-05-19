import React from 'react'
import { Dropdown } from 'components/ui'
import HorizontalMenuNavLink from './HorizontalMenuNavLink'
import { useTranslation } from 'react-i18next'

const HorizontalMenuDropdownItem = ({ nav }) => {
    const { title, translateKey, path, key } = nav

    const { t } = useTranslation()

    const itemTitle = t(translateKey, title)

    return (
        <Dropdown.Item eventKey={key}>
            {path ? (
                <HorizontalMenuNavLink path={path}>
                    {itemTitle}
                </HorizontalMenuNavLink>
            ) : (
                <span>{itemTitle}</span>
            )}
        </Dropdown.Item>
    )
}

export default HorizontalMenuDropdownItem
