import React from 'react'
import { Radio } from 'components/ui'
import { useSelector, useDispatch } from 'react-redux'
import { setNavMode } from 'store/theme/themeSlice'
import { NAV_MODE_THEMED } from 'constants/theme.constant'

const NavModeSwitcher = () => {
    const navMode = useSelector((state) => state.theme.navMode)
    const dispatch = useDispatch()

    const onSetNavMode = (val) => {
        dispatch(setNavMode(val))
    }

    return (
        <Radio.Group
            value={navMode === NAV_MODE_THEMED ? NAV_MODE_THEMED : 'default'}
            onChange={(val) => onSetNavMode(val)}
        >
            <Radio value="default">Default</Radio>
            <Radio value={NAV_MODE_THEMED}>Themed</Radio>
        </Radio.Group>
    )
}

export default NavModeSwitcher
