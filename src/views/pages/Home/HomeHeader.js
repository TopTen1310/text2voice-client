import React from 'react'
import { DatePicker, Button } from 'components/ui'
import { HiOutlineFilter } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'

import dayjs from 'dayjs'

const dateFormat = 'MMM DD, YYYY'

const { DatePickerRange } = DatePicker

const HomeHeader = () => {
    // const dispatch = useDispatch()

    // const startDate = useSelector(
    //     (state) => state.salesDashboard.state.startDate
    // )
    // const endDate = useSelector((state) => state.salesDashboard.state.endDate)

    // const handleDateChange = (value) => {
    //     dispatch(setStartDate(value[0]))
    //     dispatch(setEndDate(value[1]))
    // }

    // const onFilter = () => {
    //     dispatch(getSalesDashboardData())
    // }

    let startDate = dayjs().subtract(3, 'month').toDate()
    let endDate = new Date()

    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3>Overview</h3>
                <p>View your last work</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <DatePickerRange
                    value={[startDate, endDate]}
                    // onChange={handleDateChange}
                    inputFormat={dateFormat}
                    size="sm"
                />
                <Button size="sm" icon={<HiOutlineFilter />} onClick={() => {}}>
                    Filter
                </Button>
            </div>
        </div>
    )
}

export default HomeHeader
