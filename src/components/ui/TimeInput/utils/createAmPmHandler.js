export function createAmPmHandler({ amLabel, pmLabel, onChange, nextRef }) {
    return (value, triggerShift) => {
        const testRegex = new RegExp(`(^(${amLabel}|${pmLabel})?$)`)
        const valLower = value.toLowerCase()

        if (valLower === amLabel || valLower === pmLabel) {
            onChange(valLower)
            triggerShift && nextRef?.current?.focus()
            triggerShift && nextRef?.current?.select()
            return
        }

        if (!testRegex.test(valLower)) {
            return
        }

        onChange(valLower)
    }
}
