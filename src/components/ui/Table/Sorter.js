import React from 'react'
import { useConfig } from '../ConfigProvider'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'

const Sorter = ({ sort }) => {
    const { themeColor, primaryColorLevel } = useConfig()

    const color = `text-${themeColor}-${primaryColorLevel}`

    const renderSort = () => {
        if (typeof sort !== 'boolean') {
            return <FaSort />
        }
        return sort ? (
            <FaSortDown className={color} />
        ) : (
            <FaSortUp className={color} />
        )
    }

    return <div className="inline-flex">{renderSort()}</div>
}

export default Sorter
