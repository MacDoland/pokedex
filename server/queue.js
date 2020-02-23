class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(value) {
        let node = new Node(value);

        if (this.size === 0) {
            this.first = node;
        }
        else {
            this.last.next = node;
        }

        this.last = node;
        this.size++;
    }

    dequeue() {
        if (!this.first) {
            return null;
        }

        let node = this.first;

        if(this.first === this.last){
            this.last = null;
        }

        this.first = this.first.next;
        this.size--;

        return node;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

module.exports.Queue = Queue;
