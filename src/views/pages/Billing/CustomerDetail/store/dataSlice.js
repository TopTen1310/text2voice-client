import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomerDetails,
    apiDeleteCrmCustomer,
    apPutCrmCustomer,
} from 'services/CrmService'

export const getCustomer = createAsyncThunk(
    'crmCustomerDetails/data/getCustomer',
    async (data) => {
        const response = await apiGetCrmCustomerDetails(data)
        return response.data
    }
)

export const deleteCustomer = createAsyncThunk(
    'crmCustomerDetails/data/deleteCustomer',
    async (data) => {
        const response = await apiDeleteCrmCustomer(data)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomerDetails/data/putCustomer',
    async (data) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'crmCustomerDetails/data',
    initialState: {
        loading: false,
        profileData: {},
        subscriptionData: [],
        paymentHistoryData: [],
        paymentMethodData: [],
    },
    reducers: {
        updatePaymentMethodData: (state, action) => {
            state.paymentMethodData = action.payload
        },
        updateProfileData: (state, action) => {
            state.profileData = action.payload
        },
    },
    extraReducers: {
        [getCustomer.fulfilled]: (state, action) => {
            state.loading = false
            state.profileData = action.payload
            state.subscriptionData = action.payload?.subscription || []
            state.paymentHistoryData = action.payload?.orderHistory || []
            state.paymentMethodData = action.payload?.paymentMethod || []
        },
        [deleteCustomer.fulfilled]: () => {},
        [putCustomer.fulfilled]: () => {},
        [getCustomer.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { updatePaymentMethodData, updateProfileData } = dataSlice.actions

export default dataSlice.reducer
