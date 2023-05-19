import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from 'components/ui'

const TextBlockSkeleton = (props) => {
    const { height, lastChildWidth, rowCount, title, titleWidth } = props

    return (
        <div className="flex flex-col gap-4">
            {title && (
                <Skeleton className="mb-1" height={height} width={titleWidth} />
            )}
            {Array.from(new Array(rowCount), (_, i) => i + 1).map(
                (row, index) => (
                    <Skeleton
                        key={row}
                        height={height}
                        width={index === rowCount - 1 && lastChildWidth}
                    />
                )
            )}
        </div>
    )
}

TextBlockSkeleton.defaultProps = {
    rowCount: 3,
    lastChildWidth: '60%',
    titleWidth: '40%',
    title: true,
}

TextBlockSkeleton.propTypes = {
    rowCount: PropTypes.number,
    lastChildWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titleWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.bool,
}

export default TextBlockSkeleton
