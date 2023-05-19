import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

import { THEME_ENUM } from 'constants/theme.constant'
import WorldMap from 'assets/maps/world-countries-sans-antarctica.json'
import shadeColor from 'utils/shadeColor'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { theme } from 'twin.macro'

const twColor = theme`colors`

const geoUrl = WorldMap
const hoverPercentage = -10

const { MODE_DARK } = THEME_ENUM

const getHighlightedRegion = (name, data, defaultMapColor) => {
    if (data.length > 0 || name) {
        for (let i = 0; i < data.length; i++) {
            const elm = data[i]
            if (name === elm.name) {
                return elm.color
            }
        }
        return defaultMapColor
    }
    return defaultMapColor
}

const getRegionHoverColor = (name, data, defaultMapColor = '') => {
    if (data.length > 0 || name) {
        for (let i = 0; i < data.length; i++) {
            const elm = data[i]
            if (name === elm.name) {
                return shadeColor(elm.color, hoverPercentage)
            }
        }
        return shadeColor(defaultMapColor, hoverPercentage)
    }
    return shadeColor(defaultMapColor, hoverPercentage)
}

const getRegionValue = (name, data, suffix = '', prefix = '') => {
    if (data.length > 0 || name) {
        for (let i = 0; i < data.length; i++) {
            const elm = data[i]
            if (name === elm.name) {
                return `${elm.name} - ${prefix}${elm.value}${suffix}`
            }
        }
        return ''
    }
    return ''
}

const MapChart = (props) => {
    const { setTooltipContent, data, mapSource, suffix, prefix } = props

    const mode = useSelector((state) => state.theme.mode)

    return (
        <ComposableMap
            style={{ transform: 'translateY(20px)' }}
            data-tip=""
            height={380}
            projectionConfig={{ scale: 145 }}
        >
            <Geographies geography={mapSource}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                        const geoName = geo.properties.name
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={() => {
                                    setTooltipContent(
                                        getRegionValue(
                                            geoName,
                                            data,
                                            suffix,
                                            prefix
                                        )
                                    )
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent('')
                                }}
                                strokeWidth={2}
                                fill={getHighlightedRegion(
                                    geoName,
                                    data,
                                    mode === MODE_DARK
                                        ? twColor.gray['500']
                                        : twColor.gray['100']
                                )}
                                stroke={
                                    mode === MODE_DARK
                                        ? twColor.gray['600']
                                        : twColor.gray['300']
                                }
                                style={{
                                    hover: {
                                        fill: getRegionHoverColor(
                                            geoName,
                                            data,
                                            mode === MODE_DARK
                                                ? twColor.gray['500']
                                                : twColor.gray['100']
                                        ),
                                        outline: 'none',
                                    },
                                }}
                            />
                        )
                    })
                }
            </Geographies>
        </ComposableMap>
    )
}

const Map = (props) => {
    const [content, setContent] = useState('')
    return (
        <>
            <MapChart {...props} setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </>
    )
}

const RegionMap = (props) => {
    const { data, mapSource, valueSuffix, valuePrefix } = props

    return (
        <Map
            data={data}
            mapSource={mapSource}
            prefix={valuePrefix}
            suffix={valueSuffix}
        />
    )
}

RegionMap.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
        })
    ).isRequired,
    mapSource: PropTypes.object,
    valueSuffix: PropTypes.string,
    valuePrefix: PropTypes.string,
}

RegionMap.defaultProps = {
    data: [],
    mapSource: geoUrl,
    mapType: 'world',
}

export default RegionMap
