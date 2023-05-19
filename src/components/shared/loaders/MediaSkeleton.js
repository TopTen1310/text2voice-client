import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from 'components/ui'

const MediaSkeleton = (props) => {
    const { showAvatar, avatarProps, titleProps, textProps } = props

    return (
        <div className="flex flex-auto items-center gap-2">
            {showAvatar && (
                <div>
                    <Skeleton variant="circle" {...avatarProps} />
                </div>
            )}
            <div className="flex flex-col gap-4 w-full">
                <Skeleton width="40%" {...titleProps} />
                <Skeleton width="20%" {...textProps} />
            </div>
        </div>
    )
}

MediaSkeleton.defaultProps = {
    showAvatar: true,
}

MediaSkeleton.propTypes = {
    showAvatar: PropTypes.bool,
    avatarProps: PropTypes.object,
    titleProps: PropTypes.object,
    textProps: PropTypes.object,
}

export default MediaSkeleton
