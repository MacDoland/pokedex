function mergeSortedArrays(array1, array2, getter, compare) {
    var mergedArray = []
    var totalLength = array1.length + array2.length;

    if (array1.length === 0) {
        console.log("empty 1");
    }

    if (array2.length === 0) {
        console.log("empty 2");
    }

    var i = 0, j = 0;


    while (mergedArray.length !== totalLength) {

        if (compare(getter(array1[i]), getter(array2[j]))) {
            mergedArray.push(array1[i]);
            i++
        }
        else {
            mergedArray.push(array2[j]);
            j++
        }

        if (array1.length <= i) {
            for (var k = j; k < array2.length; k++) {
                mergedArray.push(array2[k]);
            }
        }

        if (array2.length <= j) {
            for (var m = i; m < array1.length; m++) {
                mergedArray.push(array1[m]);
            }
        }
    }


    return mergedArray;
}


const mergeSort = (items, getter = (item) => item, compare = (a,b) => a <= b) => {
    if (items.length <= 1) {
        return items;
    }

    let midPoint = Math.floor(items.length / 2);
    let lowerHalf = mergeSort(items.slice(0, midPoint), getter, compare);
    let upperHalf = mergeSort(items.slice(midPoint), getter, compare);
    return mergeSortedArrays(lowerHalf, upperHalf, getter, compare);
}


export default mergeSort;