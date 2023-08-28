function sortData(array: Array<number | string>): Array<number | string> {
    return array.sort((a, b) => a < b ? -1 : 1);
}