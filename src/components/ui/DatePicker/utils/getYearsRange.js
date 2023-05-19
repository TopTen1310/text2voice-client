export function getYearsRange(range) {
    const years = []

    for (let year = range.from; year <= range.to; year += 1) {
        years.push(year)
    }

    return years
}
