const distinctFilter = (value, index, self) => {
    return self.indexOf(value) === index;
}


export { distinctFilter };