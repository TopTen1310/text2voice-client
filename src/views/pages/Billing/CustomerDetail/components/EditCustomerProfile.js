import React, { useRef } from 'react'
import { Drawer, Button } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { closeEditCustomerDetailDialog } from '../store/stateSlice'
import { updateProfileData, putCustomer } from '../store/dataSlice'
import CustomerForm from 'views/pages/CustomerForm'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'

const DrawerFooter = ({ onSaveClick, onCancel }) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Save
            </Button>
        </div>
    )
}

const EditCustomerProfile = () => {
    const dispatch = useDispatch()

    const formikRef = useRef()

    const dialogOpen = useSelector(
        (state) => state.crmCustomerDetails.state.editCustomerDetailDialog
    )
    const customer = useSelector(
        (state) => state.crmCustomerDetails.data.profileData
    )

    const onDrawerClose = () => {
        dispatch(closeEditCustomerDetailDialog())
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    const onFormSubmit = (values) => {
        const clonedData = cloneDeep(customer)
        const {
            name,
            birthday,
            email,
            img,
            location,
            title,
            phoneNumber,
            facebook,
            twitter,
            pinterest,
            linkedIn,
        } = values

        const basicInfo = { name, email, img }
        const personalInfo = {
            location,
            title,
            birthday: dayjs(birthday).format('DD/MM/YYYY'),
            phoneNumber,
            facebook,
            twitter,
            pinterest,
            linkedIn,
        }
        clonedData.personalInfo = {
            ...clonedData.personalInfo,
            ...personalInfo,
        }
        const newData = { ...clonedData, ...basicInfo }
        dispatch(updateProfileData(newData))
        dispatch(putCustomer(newData))
        onDrawerClose()
    }

    return (
        <Drawer
            isOpen={dialogOpen}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
            closable={false}
            bodyClass="p-0"
            footer={
                <DrawerFooter
                    onCancel={onDrawerClose}
                    onSaveClick={formSubmit}
                />
            }
        >
            <CustomerForm
                ref={formikRef}
                onFormSubmit={onFormSubmit}
                customer={customer}
            />
        </Drawer>
    )
}

export default EditCustomerProfile
