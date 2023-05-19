import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import tw, { theme } from 'twin.macro'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { HiCheck, HiChevronDown, HiX } from 'react-icons/hi'
import Spinner from '../Spinner'
import { CONTROL_SIZES, SIZES } from '../utils/constant'

const DefaultOption = ({
    innerProps,
    label,
    selectProps,
    isSelected,
    isDisabled,
    isFocused,
}) => {
    const { themeColor } = selectProps
    return (
        <div
            className={classNames(
                'select-option',
                isSelected && 'selected',
                isDisabled && 'disabled',
                isFocused && 'focused'
            )}
            {...innerProps}
        >
            <span className="ml-2">{label}</span>
            {isSelected && (
                <HiCheck
                    className={`text-${themeColor} dark:text-white text-xl`}
                />
            )}
        </div>
    )
}

const DefaultDropdownIndicator = () => {
    return (
        <div className="select-dropdown-indicator">
            <HiChevronDown />
        </div>
    )
}

const DefaultClearIndicator = (props) => {
    const {
        innerProps: { ref, ...restInnerProps },
    } = props
    return (
        <div {...restInnerProps} ref={ref}>
            <div className="select-clear-indicator">
                <HiX />
            </div>
        </div>
    )
}

const DefaultLoadingIndicator = ({ selectProps }) => {
    const { themeColor } = selectProps
    return (
        <Spinner className={`select-loading-indicatior text-${themeColor}`} />
    )
}

const Select = React.forwardRef((props, ref) => {
    const {
        size,
        style,
        className,
        form,
        field,
        components,
        componentAs: Component,
        ...rest
    } = props

    const { themeColor, controlSize, primaryColorLevel, mode } = useConfig()
    const formControlSize = useForm()?.size
    const inputGroupSize = useInputGroup()?.size

    const selectSize = size || inputGroupSize || formControlSize || controlSize

    const twColor = theme`colors`
    const twHeight = theme`height`

    let isInvalid = false

    if (!isEmpty(form)) {
        const { touched, errors } = form

        const touchedField = get(touched, field.name)
        const errorField = get(errors, field.name)

        isInvalid = touchedField && errorField
    }

    const getBoxShadow = (state) => {
        const shadaowBase = '0 0 0 1px '

        if (isInvalid) {
            return shadaowBase + twColor.red['500']
        }

        if (state.isFocused) {
            return shadaowBase + twColor[themeColor][primaryColorLevel]
        }

        return 'none'
    }

    const styles = {
        control: (provided, state) => {
            return {
                ...provided,
                height: twHeight[CONTROL_SIZES[selectSize]],
                minHeight: twHeight[CONTROL_SIZES[selectSize]],
                '&:hover': {
                    boxShadow: getBoxShadow(state),
                    cursor: 'pointer',
                },
                boxShadow: getBoxShadow(state),
                borderRadius: tw`rounded-md`.borderRadius,
                ...(isInvalid ? { borderColor: twColor.red['500'] } : {}),
            }
        },
        input: (css) => {
            return {
                ...css,
                input: {
                    outline: 'none',
                    outlineOffset: 0,
                    boxShadow: 'none !important',
                },
            }
        },
        menu: (provided) => ({ ...provided, zIndex: 50 }),
        ...style,
    }

    const selectClass = classNames('select', `select-${selectSize}`, className)

    return (
        <Component
            className={selectClass}
            classNamePrefix={'select'}
            ref={ref}
            styles={styles}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    neutral20:
                        mode === 'dark'
                            ? twColor.gray['600']
                            : twColor.gray['300'],
                    neutral30:
                        mode === 'dark'
                            ? twColor.gray['600']
                            : twColor.gray['300'],
                    neutral80: twColor.gray['700'],
                    neutral10:
                        mode === 'dark'
                            ? twColor.gray['600']
                            : twColor.gray['300'],
                    primary25: twColor[themeColor]['50'],
                    primary50: twColor[themeColor]['100'],
                    primary: twColor[themeColor][primaryColorLevel],
                },
            })}
            themeColor={`${themeColor}-${primaryColorLevel}`}
            components={{
                IndicatorSeparator: () => null,
                Option: DefaultOption,
                LoadingIndicator: DefaultLoadingIndicator,
                DropdownIndicator: DefaultDropdownIndicator,
                ClearIndicator: DefaultClearIndicator,
                ...components,
            }}
            {...field}
            {...rest}
        />
    )
})

Select.propTypes = {
    size: PropTypes.oneOf([SIZES.LG, SIZES.MD, SIZES.SM, SIZES.XS]),
    componentAs: PropTypes.elementType,
}

Select.defaultProps = {
    componentAs: ReactSelect,
}

export default Select
