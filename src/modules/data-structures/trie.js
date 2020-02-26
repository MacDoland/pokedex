import { distinctFilter, itemLengthFilter, notUndefinedFilter } from '../filters/filters';

class Trie {
    constructor(items = [], getter = (item) => item) {
        if (Array.isArray(items) && items.length > 0) {
            this.maxTreeDepth = items.map(getter).reduce((a, b) => { return a.length > b.length ? a : b; }).length;
            this.nodes = new PokeTreeNode(items, 0, getter);
        }
    }

    //operations on tree go here

    search(searchString = '') {

        if (!this.nodes || typeof (searchString) !== "string" || searchString.length > this.maxTreeDepth) {
            return []; // we know there are no matches because the search string is longer than any words we hold
        }

        if (searchString.length === 0) {
            return this.nodes.items;
        }

        let characters = searchString.split('');

        return this.searchNodes(characters, this.nodes);
    }

    searchNodes(searchStrings, node) {

        if (searchStrings.length === 0) {
            return node.items;
        } //base case

        let key = searchStrings.shift();

        if (node && node.children && Object.keys(node.children).includes(key) && node.children[key].items) {
            return this.searchNodes(searchStrings, node.children[key]);
        }

        return [];
    }
}

class PokeTreeNode {
    constructor(items, depth = 0, getter) {
        this.items = items
            .filter((value, index, self) => {
                return notUndefinedFilter(getter(value), index, self);
            });

        this.children = {};

        let keys = this.items
            .map((value) => {
                return getter(value)[depth];
            })//set to target character in string
            .filter(distinctFilter);//distinct for unique keys

        keys.forEach((key) => {
            let childItems = this.items.filter((value) => {
                return getter(value)[depth] === key; // get all items that match key
            }).filter((value) => {
                return itemLengthFilter(getter(value), depth) //filter out any items that have lengths that are less than the current depth
            });

            if (childItems.length > 0) {
                this.children[key] = new PokeTreeNode(childItems, depth + 1, getter); // create a new branch for remaining items
            }
        })
    }
}


export default Trie;


