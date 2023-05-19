import { isSameMonth } from '../../../utils'

export default function isOutside(date, month) {
    return !isSameMonth(date, month)
}
