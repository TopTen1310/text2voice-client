import React from 'react'
import classNames from 'classnames'
import { Select, Badge } from 'components/ui'
import { setThemeColor, setThemeColorLevel } from 'store/theme/themeSlice'
import { HiCheck } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { components } from 'react-select'

const { Control } = components

const colorList = [
    { label: 'Red', value: 'red' },
    { label: 'Orange', value: 'orange' },
    { label: 'Amber', value: 'amber' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Lime', value: 'lime' },
    { label: 'Green', value: 'green' },
    { label: 'Emerald', value: 'emerald' },
    { label: 'Teal', value: 'teal' },
    { label: 'Cyan', value: 'cyan' },
    { label: 'Sky', value: 'sky' },
    { label: 'Blue', value: 'blue' },
    { label: 'Indigo', value: 'indigo' },
    { label: 'Violet', value: 'violet' },
    { label: 'Purple', value: 'purple' },
    { label: 'Fuchsia', value: 'fuchsia' },
    { label: 'Pink', value: 'pink' },
    { label: 'Rose', value: 'rose' },
]

const colorLevelList = [
    { label: '400', value: 400 },
    { label: '500', value: 500 },
    { label: '600', value: 600 },
    { label: '700', value: 700 },
    { label: '800', value: 800 },
    { label: '900', value: 900 },
]

const ColorBadge = ({ className, themeColor }) => {
    const primaryColorLevel = useSelector(
        (state) => state.theme.primaryColorLevel
    )

    return (
        <Badge
            className={className}
            innerClass={classNames(`bg-${themeColor}-${primaryColorLevel}`)}
        />
    )
}

const CustomSelectOption = ({ innerProps, label, value, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <ColorBadge themeColor={value} />
                <span>{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]

    const themeColor = useSelector((state) => state.theme.themeColor)

    return (
        <Control {...props}>
            {selected && (
                <ColorBadge
                    themeColor={themeColor}
                    className="ltr:ml-4 rtl:mr-4"
                />
            )}
            {children}
        </Control>
    )
}

const ThemeSwitcher = () => {
    const dispatch = useDispatch()

    const themeColor = useSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useSelector(
        (state) => state.theme.primaryColorLevel
    )

    const onThemeColorChange = ({ value }) => {
        dispatch(setThemeColor(value))
    }

    const onThemeColorLevelChange = ({ value }) => {
        dispatch(setThemeColorLevel(value))
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <Select
                size="sm"
                options={colorList}
                components={{
                    Option: CustomSelectOption,
                    Control: CustomControl,
                }}
                value={colorList.filter((color) => color.value === themeColor)}
                onChange={onThemeColorChange}
            />
            <Select
                size="sm"
                options={colorLevelList}
                value={colorLevelList.filter(
                    (color) => color.value === primaryColorLevel
                )}
                onChange={onThemeColorLevelChange}
            />
        </div>
    )
}

export default ThemeSwitcher
