export default function wildCardSearch(list, input, specifyKey) {
    const searchText = (item) => {
        for (let key in item) {
            if (item[specifyKey ? specifyKey : key] == null) {
                continue
            }
            if (
                item[specifyKey ? specifyKey : key]
                    .toString()
                    .toUpperCase()
                    .indexOf(input.toString().toUpperCase()) !== -1
            ) {
                return true
            }
        }
    }
    const result = list.filter((value) => searchText(value))
    return result
}
