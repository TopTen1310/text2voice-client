import React from 'react'
import View from 'views'
import SidePanel from 'components/template/SidePanel'

const BlankLayout = (props) => {
    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            <View {...props} />
            <SidePanel className="hidden" />
        </div>
    )
}

export default BlankLayout
