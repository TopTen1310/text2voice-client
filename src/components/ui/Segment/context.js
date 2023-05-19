import { createContext, useContext } from 'react'

const SegmentContext = createContext()

export const SegmentContextProvider = SegmentContext.Provider

export const SegmentContextConsumer = SegmentContext.Consumer

export function useSegment() {
    return useContext(SegmentContext)
}

export default SegmentContext
