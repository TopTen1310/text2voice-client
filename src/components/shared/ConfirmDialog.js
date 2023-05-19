import React from 'react'
import {
    HiCheckCircle,
    HiOutlineInformationCircle,
    HiOutlineExclamation,
    HiOutlineExclamationCircle,
} from 'react-icons/hi'
import { Avatar, Button, Dialog } from 'components/ui'
import PropTypes from 'prop-types'

const StatusIcon = ({ status }) => {
    switch (status) {
        case 'info':
            return (
                <Avatar
                    className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
                    shape="circle"
                >
                    <span className="text-2xl">
                        <HiOutlineInformationCircle />
                    </span>
                </Avatar>
            )
        case 'success':
            return (
                <Avatar
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    shape="circle"
                >
                    <span className="text-2xl">
                        <HiCheckCircle />
                    </span>
                </Avatar>
            )
        case 'warning':
            return (
                <Avatar
                    className="text-amber-600 bg-amber-100 dark:text-amber-100"
                    shape="circle"
                >
                    <span className="text-2xl">
                        <HiOutlineExclamationCircle />
                    </span>
                </Avatar>
            )
        case 'danger':
            return (
                <Avatar
                    className="text-red-600 bg-red-100 dark:text-red-100"
                    shape="circle"
                >
                    <span className="text-2xl">
                        <HiOutlineExclamation />
                    </span>
                </Avatar>
            )

        default:
            return null
    }
}

const ConfirmDialog = (props) => {
    const {
        type,
        title,
        children,
        onCancel,
        onConfirm,
        cancelText,
        confirmText,
        confirmButtonColor,
        ...rest
    } = props

    const handleCancel = () => {
        onCancel?.()
    }

    const handleConfirm = () => {
        onConfirm?.()
    }

    return (
        <Dialog
            style={{
                marginTop: 250,
            }}
            contentClassName="pb-0 px-0"
            {...rest}
        >
            <div className="px-6 pb-6 pt-2 flex">
                <div>
                    <StatusIcon status={type} />
                </div>
                <div className="ml-4 rtl:mr-4">
                    <h5 className="mb-2">{title}</h5>
                    {children}
                </div>
            </div>
            <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                <Button
                    size="sm"
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={handleCancel}
                >
                    {cancelText}
                </Button>
                <Button
                    size="sm"
                    variant="solid"
                    onClick={handleConfirm}
                    color={confirmButtonColor}
                >
                    {confirmText}
                </Button>
            </div>
        </Dialog>
    )
}

ConfirmDialog.propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
}

ConfirmDialog.defaultProps = {
    type: 'info',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
}

export default ConfirmDialog
