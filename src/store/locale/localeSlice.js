import { createSlice } from '@reduxjs/toolkit'
import appConfig from 'configs/app.config'

const initialState = {
    currentLang: appConfig.locale,
}

export const localeSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.currentLang = action.payload
        },
    },
})

export const { setLang } = localeSlice.actions

export default localeSlice.reducer
