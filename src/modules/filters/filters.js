const distinctFilter = (value, index, self) => {
    return self.indexOf(value) === index;
}

const notUndefinedFilter = (value, index, self) => {
    return typeof(value) !== 'undefined';
}

const itemLengthFilter = (value, length) => {
    return value.length > length;
}

const filterByRange = (items, max) => {
    return items.slice(0, max);
}

const filterByType = (items, types) => {
    if (types.length === 0) {
        return items;
    }

    return items.filter((item) => {
        return types.every((type) => {
            return item.type.includes(type);
        });
    });
}

export { distinctFilter, itemLengthFilter, notUndefinedFilter, filterByRange, filterByType };