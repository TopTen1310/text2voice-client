import React from 'react'
import classNames from 'classnames'
import HorizontalMenuContent from 'components/template/HorizontalMenuContent'
import { NAV_MODE_THEMED } from 'constants/theme.constant'
import useResponsive from 'utils/hooks/useResponsive'
import { useSelector } from 'react-redux'

const SecondaryHeader = (props) => {
    const { className, contained } = props

    const navMode = useSelector((state) => state.theme.navMode)
    const themeColor = useSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useSelector(
        (state) => state.theme.primaryColorLevel
    )
    const userAuthority = useSelector((state) => state.auth.user.authority)

    const { larger } = useResponsive()

    const headerColor = () => {
        if (navMode === NAV_MODE_THEMED) {
            return `bg-${themeColor}-${primaryColorLevel} secondary-header-${navMode}`
        }
        return `secondary-header-${navMode}`
    }

    return (
        <>
            {larger.md && (
                <div
                    className={classNames(
                        'h-16 flex items-center',
                        headerColor(),
                        className
                    )}
                >
                    <div
                        className={classNames(
                            'flex items-center px-4',
                            contained && 'container mx-auto',
                            headerColor
                        )}
                    >
                        <HorizontalMenuContent
                            manuVariant={navMode}
                            userAuthority={userAuthority}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default SecondaryHeader
