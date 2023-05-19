import { padTime } from './padTime'

export function getTimeValues(value, format, amLabel, pmLabel) {
    if (!(value instanceof Date)) {
        return { hours: '', minutes: '', seconds: '', amPm: '' }
    }

    let _hours = value.getHours()

    const isPm = _hours >= 12
    if (format === '12') {
        _hours %= 12
        if (_hours === 0) {
            _hours += 12
        }
    }

    return {
        hours: padTime(_hours.toString()),
        minutes: padTime(value.getMinutes().toString()),
        seconds: padTime(value.getSeconds().toString()),
        amPm: isPm ? pmLabel : amLabel,
    }
}
