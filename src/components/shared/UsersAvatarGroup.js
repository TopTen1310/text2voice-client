import React, { useMemo } from 'react'
import { Avatar, Tooltip } from 'components/ui'
import acronym from 'utils/acronym'
import PropTypes from 'prop-types'
import useTwColorByName from 'utils/hooks/useTwColorByName'

const UsersAvatarGroup = (props) => {
    const {
        avatarGroupProps,
        avatarProps,
        imgKey,
        nameKey,
        onAvatarClick,
        users,
        ...rest
    } = props

    const bgColor = useTwColorByName()

    const defaultAvatarProps = useMemo(() => {
        return {
            shape: 'circle',
            size: 30,
            className: 'cursor-pointer',
            ...avatarProps,
        }
    }, [avatarProps])

    const handleAvatarClick = (avatar) => {
        onAvatarClick?.(avatar)
    }

    return (
        <Avatar.Group
            omittedAvatarTooltip
            omittedAvatarProps={defaultAvatarProps}
            chained
            {...avatarGroupProps}
            {...rest}
        >
            {users.map((elm, index) => (
                <Tooltip key={elm[nameKey] + index} title={elm[nameKey]}>
                    <Avatar
                        {...defaultAvatarProps}
                        className={`${
                            elm[imgKey] ? '' : bgColor(elm[nameKey])
                        } ${defaultAvatarProps.className}`}
                        src={elm[imgKey]}
                        onClick={() => handleAvatarClick(elm)}
                    >
                        {acronym(elm.name)}
                    </Avatar>
                </Tooltip>
            ))}
        </Avatar.Group>
    )
}

UsersAvatarGroup.defaultProps = {
    avatarProps: {},
    avatarGroupProps: {},
    users: [],
    nameKey: 'name',
    imgKey: 'img',
}

UsersAvatarGroup.propTypes = {
    users: PropTypes.array,
    avatarProps: PropTypes.object,
    avatarGroupProps: PropTypes.object,
    nameKey: PropTypes.string,
    imgKey: PropTypes.string,
}

export default UsersAvatarGroup
