import { padTime } from './padTime'
import { clamp } from './clamp'

function allButLastDigit(value) {
    return Math.floor(value / 10)
}

export function createTimeHandler({ onChange, nextRef, min, max, nextMax }) {
    return (value, triggerShift, forceTriggerShift = false) => {
        const parsed = parseInt(value, 10)

        if (Number.isNaN(parsed)) {
            return
        }

        if (parsed > allButLastDigit(max) || forceTriggerShift) {
            const lastDigit = parsed % 10

            let updatedValue
            let carryOver

            if (
                parsed > max &&
                nextMax &&
                lastDigit <= allButLastDigit(nextMax)
            ) {
                updatedValue = padTime(allButLastDigit(parsed).toString())
                carryOver = padTime(lastDigit.toString())
            } else {
                updatedValue = padTime(clamp(parsed, min, max).toString())
            }

            onChange(updatedValue, carryOver)
            triggerShift && nextRef?.current?.focus()
            triggerShift && nextRef?.current?.select()
            return
        }

        onChange(parsed.toString())
    }
}
