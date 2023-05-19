import React, { useRef, forwardRef } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Input from '../Input'
import useRootClose from '../hooks/useRootClose'
import { usePopper } from 'react-popper'
import useMergedRef from '../hooks/useMergeRef'
import { HiOutlineCalendar } from 'react-icons/hi'
import CloseButton from '../CloseButton'

dayjs.extend(localizedFormat)

const BasePicker = forwardRef((props, ref) => {
    const {
        className,
        clearButton,
        children,
        form,
        field,
        size,
        inputtable,
        inputtableBlurClose = true,
        inputLabel,
        inputPrefix,
        inputSuffix = <HiOutlineCalendar className="text-lg" />,
        clearable = true,
        placeholder,
        name,
        dropdownOpened,
        setDropdownOpened,
        onDropdownOpen,
        onDropdownClose,
        onBlur,
        onFocus,
        onChange,
        onKeyDown,
        onClear,
        disabled,
        type,
        placement = 'bottom-start',
    } = props

    const handleInputClick = () => {
        !inputtable ? toggleDropdown() : openDropdown()
    }

    const closeDropdown = () => {
        setDropdownOpened(false)
        onDropdownClose?.()
    }

    const suffixIconSlot = clearable ? (
        <div onClick={onClear}>
            {clearButton || <CloseButton className="text-base" />}
        </div>
    ) : (
        <>{inputSuffix}</>
    )

    const toggleDropdown = () => {
        setDropdownOpened(!dropdownOpened)
        !dropdownOpened ? onDropdownOpen?.() : onDropdownClose?.()
    }

    const openDropdown = () => {
        setDropdownOpened(true)
        onDropdownOpen?.()
    }

    const handleKeyDown = (event) => {
        typeof onKeyDown === 'function' && onKeyDown(event)
        if ((event.key === 'Space' || event.key === 'Enter') && !inputtable) {
            event.preventDefault()
            openDropdown()
        }
    }

    const handleInputBlur = (event) => {
        typeof onBlur === 'function' && onBlur(event)
        if (inputtable && inputtableBlurClose) {
            closeDropdown()
        }
    }

    const handleInputFocus = (event) => {
        typeof onFocus === 'function' && onFocus(event)
        if (inputtable) {
            openDropdown()
        }
    }

    const referenceRef = useRef(null)
    const popperRef = useRef(null)

    const { styles, attributes } = usePopper(
        referenceRef.current,
        popperRef.current,
        {
            placement: placement,
            modifiers: [
                {
                    name: 'offset',
                    enabled: true,
                    options: {
                        offset: [0, 10],
                    },
                },
            ],
        }
    )

    useRootClose(() => closeDropdown(), {
        triggerTarget: referenceRef,
        overlayTarget: popperRef,
        disabled: !dropdownOpened,
        listenEscape: false,
    })

    return (
        <>
            <Input
                form={form}
                field={field}
                className={className}
                placeholder={placeholder}
                ref={useMergedRef(ref, referenceRef)}
                size={size}
                name={name}
                value={inputLabel}
                readOnly={!inputtable}
                suffix={suffixIconSlot}
                prefix={inputPrefix}
                onClick={handleInputClick}
                onKeyDown={handleKeyDown}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChange={onChange}
                autoComplete="off"
                type={type}
                disabled={disabled}
            />
            <div
                className="picker"
                ref={popperRef}
                style={styles.popper}
                {...attributes.popper}
            >
                {dropdownOpened && (
                    <div className="picker-panel">{children}</div>
                )}
            </div>
        </>
    )
})

export default BasePicker
