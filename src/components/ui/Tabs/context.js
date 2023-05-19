import { createContext, useContext } from 'react'

const TabsContext = createContext()

export const TabsContextProvider = TabsContext.Provider

export const TabsContextConsumer = TabsContext.Consumer

export function useTabs() {
    return useContext(TabsContext)
}

export default TabsContext
