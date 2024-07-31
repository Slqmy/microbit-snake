class LinkedList<T> {
    public elements: LinkedListElement<T>[];

    constructor(elements: LinkedListElement<T>[]) {
        this.elements = elements;
    }

    get head() {
        return this.elements[0];
    }

    get tail() {
        const elements = this.elements;
        return elements[elements.length - 1];
    }

    get length() {
        return this.elements.length;
    }

    public push(element: T) {
        const elements = this.elements;

        const elementToAppend: LinkedListElement<T> = { value: element, next: null };

        elements.push(elementToAppend);
        elements[elements.length - 2].next = elementToAppend;
    }

    public shift() {
        this.elements.shift();
    }

    public unshift(value: T) {
        const element = {
            value,
            next: this.head
        }

        this.elements.unshift(element);
    }

    public pop() {
        const elements = this.elements;

        const secondLast = elements[elements.length - 2];
        secondLast.next = null;

        return elements.pop();
    }
}
