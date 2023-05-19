import React, { forwardRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const RichTextEditor = forwardRef((props, ref) => {
    return (
        <div className="rich-text-editor">
            <ReactQuill ref={ref} {...props} />
        </div>
    )
})

export default RichTextEditor
