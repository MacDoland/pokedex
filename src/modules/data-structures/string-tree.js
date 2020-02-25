import { distinctFilter, itemLengthFilter, notUndefinedFilter } from '../filters/filters';

const getLetter = (item, index) => {
    if (item.length > index) {
        return item[index];
    }
}

class TreeNode {
    constructor(items, depth = 0) {
        this.items = items
            .filter(notUndefinedFilter);


        this.children = {};

        let keys = this.items
            .map((item) => item[depth])//set to target character
            .filter(distinctFilter); //distinct


        keys.forEach((key) => {
            let childItems = this.items.filter((item) => {
                return item[depth] === key;
            }).filter((item) => {
                return itemLengthFilter(item, depth)
            });

            if (childItems.length > 0) {
                
                this.children[key] = new TreeNode(childItems, depth + 1);
            }
        })
    }
}


export default TreeNode;


