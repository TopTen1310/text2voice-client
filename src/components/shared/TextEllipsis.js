import React from 'react'
import PropTypes from 'prop-types'

const TextEllipsis = (props) => {
    const { text, maxTextCount } = props

    return (
        <>
            {(text && text.length) > maxTextCount
                ? text.substring(0, maxTextCount - 3) + '...'
                : text}
        </>
    )
}

TextEllipsis.propTypes = {
    text: PropTypes.string,
}

TextEllipsis.defaultProps = {
    text: '',
    maxTextCount: 0,
}

export default TextEllipsis
