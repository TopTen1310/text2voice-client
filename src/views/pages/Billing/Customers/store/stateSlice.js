import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'crmCustomers/state',
    initialState: {
        drawerOpen: false,
        selectedCustomer: {},
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
    },
})

export const { setSelectedCustomer, setDrawerOpen, setDrawerClose } =
    stateSlice.actions

export default stateSlice.reducer
