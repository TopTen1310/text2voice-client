import React from 'react'
import { InputGroup, Button } from 'components/ui'
import useDirection from 'utils/hooks/useDirection'
import { THEME_ENUM } from 'constants/theme.constant'

const dirList = [
    { value: THEME_ENUM.DIR_LTR, label: 'LTR' },
    { value: THEME_ENUM.DIR_RTL, label: 'RTL' },
]

const DirectionSwitcher = ({ callBackClose }) => {
    const [direction, updateDirection] = useDirection()

    const onDirChange = (val) => {
        updateDirection(val)
        callBackClose?.()
    }

    return (
        <InputGroup size="sm">
            {dirList.map((dir) => (
                <Button
                    key={dir.value}
                    active={direction === dir.value}
                    onClick={() => onDirChange(dir.value)}
                >
                    {dir.label}
                </Button>
            ))}
        </InputGroup>
    )
}

export default DirectionSwitcher
