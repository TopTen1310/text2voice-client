import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import ApexChart from 'react-apexcharts'
import {
    apexLineChartDefaultOption,
    apexBarChartDefaultOption,
    apexAreaChartDefaultOption,
    apexDonutChartDefaultOption,
} from 'configs/chart.config'
import { DIR_RTL } from 'constants/theme.constant'

const notDonut = ['line', 'bar', 'area']

const Chart = (props) => {
    const {
        series,
        width,
        height,
        xAxis,
        customOptions,
        type,
        direction,
        donutTitle,
        donutText,
        className,
        ...rest
    } = props

    const chartRef = useRef()

    const chartDefaultOption = useMemo(() => {
        switch (type) {
            case 'line':
                return apexLineChartDefaultOption
            case 'bar':
                return apexBarChartDefaultOption
            case 'area':
                return apexAreaChartDefaultOption
            case 'donut':
                return apexDonutChartDefaultOption
            default:
                return apexLineChartDefaultOption
        }
    }, [type])

    let options = JSON.parse(JSON.stringify(chartDefaultOption))
    const isMobile = window.innerWidth < 768

    const setLegendOffset = useCallback(() => {
        if (chartRef.current) {
            const lengend = chartRef.current.querySelectorAll(
                'div.apexcharts-legend'
            )[0]
            if (direction === DIR_RTL) {
                lengend.style.right = 'auto'
                lengend.style.left = '0'
            }
            if (isMobile) {
                lengend.style.position = 'relative'
                lengend.style.top = 0
                lengend.style.justifyContent = 'start'
                lengend.style.padding = 0
            }
        }
    }, [direction, isMobile])

    useEffect(() => {
        if (notDonut.includes(type)) {
            setLegendOffset()
        }
    }, [type, setLegendOffset])

    if (notDonut.includes(type)) {
        options.xaxis.categories = xAxis
    }

    if (customOptions) {
        options = { ...options, ...customOptions }
    }

    if (type === 'donut') {
        if (donutTitle) {
            options.plotOptions.pie.donut.labels.total.label = donutTitle
        }
        if (donutText) {
            options.plotOptions.pie.donut.labels.total.formatter = () =>
                donutText
        }
    }

    return (
        <div
            style={direction === DIR_RTL ? { direction: 'ltr' } : {}}
            className="chartRef"
            ref={chartRef}
        >
            <ApexChart
                options={options}
                type={type}
                series={series}
                width={width}
                height={height}
                className={className}
                {...rest}
            />
        </div>
    )
}

Chart.propTypes = {
    customOptions: PropTypes.object,
    donutTitle: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    series: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['line', 'bar', 'area', 'donut']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    xAxis: PropTypes.array,
}

Chart.defaultProps = {
    series: [],
    height: 300,
    width: '100%',
    type: 'line',
}

export default Chart
