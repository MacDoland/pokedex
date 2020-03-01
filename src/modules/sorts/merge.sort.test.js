import mergeSort from './merge.sort';

describe('mergeSort', () => {
    test('When passed empty array, mergeSort returns empty array', () => {
        //arrange
        const items = []
            , expected = []
            , expectedLength = 0;

        //act
        const result = mergeSort(items);

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When passed odd sorted array of numbers, mergeSort returns sorted array', () => {
        //arrange
        const items = [0, 2, 4, 6, 8]
            , expected = [0, 2, 4, 6, 8]
            , expectedLength = 5;

        //act
        const result = mergeSort(items);

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When passed even sorted array of numbers, mergeSort returns sorted array', () => {
        //arrange
        const items = [0, 2, 4, 6]
            , expected = [0, 2, 4, 6]
            , expectedLength = 4;

        //act
        const result = mergeSort(items);

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When passed odd unsorted array of numbers, mergeSort returns sorted array', () => {
        //arrange
        const items = [10, 2, 40, 6, 80]
            , expected = [2, 6, 10, 40, 80]
            , expectedLength = 5;

        //act
        const result = mergeSort(items);

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When passed even unsorted array of numbers, mergeSort returns sorted array', () => {
        //arrange
        const items = [10, 2, 40, 6]
            , expected = [2, 6, 10, 40]
            , expectedLength = 4;

        //act
        const result = mergeSort(items);

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When passed unsorted array of numbers with descending comparison, mergeSort returns reversed sorted array', () => {
        //arrange
        const items = [10, 2, 40, 6, 80]
            , expected = [80, 40, 10, 6, 2]
            , expectedLength = 5;

        //act
        const result = mergeSort(items, (item) => item, (a, b) => a > b);

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When passed object array using appropriate getter, mergeSort returns sorted object array', () => {
        //arrange
        const items = [{ value: 4 }, { value: 2 }, { value: 5 }, { value: 1 }]
            , expected = [{ value: 1 }, { value: 2 }, { value: 4 }, { value: 5 }]
            , expectedLength = 4;

        //act
        const result = mergeSort(items, (item) => item.value);

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });
});
