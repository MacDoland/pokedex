import Trie from './trie';

describe('Trie', () => {
    test('When empty search Trie returns all items', () => {
        //arrange
        const items = ['a', 'b', 'c']
            , tree = new Trie(items)
            , expected = items
            , expectedLength = 3;

        //act
        const result = tree.search();

        //assert
        expect(result).toStrictEqual(expected);
        expect(result.length).toBe(expectedLength);
    });


    test('When empty string search Trie returns all items', () => {
        //arrange
        const items = ['a', 'b', 'c']
            , tree = new Trie(items)
            , expected = items
            , expectedLength = 3;

        //act
        const result = tree.search('');

        //assert
        expect(result).toStrictEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When lowercase and single letter search, Trie returns all matched items', () => {
        //arrange
        const items = ['john', 'bee', 'callum', 'ben', 'jose', 'Jack', 'Jill', 'Jim']
            , tree = new Trie(items)
            , expected = ['bee', 'ben']
            , expectedLength = 2;

        //act
        const result = tree.search('b');

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When uppercase and single letter search, Trie returns all matched items', () => {
        //arrange
        const items = ['john', 'bee', 'callum', 'ben', 'jose', 'Jack', 'Jill', 'Jim']
            , tree = new Trie(items)
            , expected = []
            , expectedLength = 0;

        //act
        const result = tree.search('B');

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When double letter search, Trie returns all matched items', () => {
        //arrange
        const items = ['john', 'bee', 'callum', 'ben', 'jose', 'Jack', 'Jill', 'Jim']
            , tree = new Trie(items)
            , expected = ['Jill', 'Jim']
            , expectedLength = 2;

        //act
        const result = tree.search('Ji');

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When double letter search incorrect casing, Trie returns no items', () => {
        //arrange
        const items = ['john', 'bee', 'callum', 'ben', 'jose', 'Jack', 'Jill', 'Jim']
            , tree = new Trie(items)
            , expected = []
            , expectedLength = 0;

        //act
        const result = tree.search('ji');

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When double letter search with insensitive getter, Trie returns all matched items', () => {
        //arrange
        const items = ['john', 'bee', 'callum', 'ben', 'jose', 'Jack', 'Jill', 'Jim']
            , tree = new Trie(items, (item) => item.toLowerCase())
            , expected = ['Jill', 'Jim']
            , expectedLength = 2;

        //act
        const result = tree.search('ji');

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When searching words longer than tree depth, Trie returns no items', () => {
        //arrange
        const items = ['john', 'bee', 'callum', 'ben', 'jose', 'Jack', 'Jill', 'Jim']
            , tree = new Trie(items, (item) => item.toLowerCase())
            , expected = []
            , expectedLength = 0;

        //act
        const result = tree.search('Jackelo');

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });

    test('When searching words has no match, Trie returns no items', () => {
        //arrange
        const items = ['john', 'bee', 'callum', 'ben', 'jose', 'Jack', 'Jill', 'Jim']
            , tree = new Trie(items, (item) => item.toLowerCase())
            , expected = []
            , expectedLength = 0;

        //act
        const result = tree.search('cat');

        //assert
        expect(result).toEqual(expected);
        expect(result.length).toBe(expectedLength);
    });
});