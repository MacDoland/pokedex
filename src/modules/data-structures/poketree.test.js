import PokeTree from './poketree';

test('When empty search PokeTree returns all items', () => {
    //arrange
    let tree = new PokeTree(['a', 'b', 'c']);
    let expected = [];
    let expectedLength = 0;

    //act
    let result = tree.search();

    //assert
    expect(result).toStrictEqual(expected);
    expect(result.length).toBe(expectedLength);
});