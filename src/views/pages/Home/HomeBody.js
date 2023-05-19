import React from 'react'
import Statistic from './Statistic.js'

const HomeBody = () => {
    const statisticData = {
        characters: 55555,
        generatedAudios: 3343,
        projects: 23,
    }

    return (
        <div>
            <Statistic data={statisticData} />
        </div>
    )
}

export default HomeBody
