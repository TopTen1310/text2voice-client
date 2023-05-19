import React, { useState } from 'react'
import SpeakerList from './components/SpeakerList.js'
import WorkSpace from './components/WorkSpace.js'
import Functions from './components/Functions.js'

const index = () => {
    const [data, setData] = useState([])

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="grid grid-cols-1 xl:grid-cols-11 gap-4">
                <div className="2xl:col-span-3 xl:col-span-4">
                    <SpeakerList />
                </div>
                <div className="2xl:col-span-8 xl:col-span-7">
                    <WorkSpace data={data} setData={setData} />
                </div>
            </div>
            <Functions data={data} />
        </div>
    )
}

export default index
