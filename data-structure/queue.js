export class Queue {
  constructor(name = 'Queue') {
    this.name = name;
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
    return this.items.length;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  toArray() {
    return [...this.items];
  }

  getInfo() {
    return {
      name: this.name,
      size: this.size(),
      isEmpty: this.isEmpty(),
      front: this.front()
    };
  }

  toString() {
    return `${this.name}: [${this.items.map(item =>
      typeof item === 'object' ? item.name || JSON.stringify(item) : item
    ).join(', ')}]`;
  }
}