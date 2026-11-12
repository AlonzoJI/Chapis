/**
 * Hands out items in random order without repeats until every item has been
 * used once. A new cycle never starts with the item that ended the last one,
 * so the same painting or song never plays twice in a row.
 */
export class ShuffleBag<T> {
  private readonly items: readonly T[];
  private readonly random: () => number;
  private queue: T[] = [];
  private last: T | undefined;

  constructor(items: readonly T[], random: () => number = Math.random) {
    if (items.length === 0) throw new Error('ShuffleBag needs at least one item');
    this.items = items;
    this.random = random;
  }

  next(): T {
    if (this.queue.length === 0) this.refill();
    const item = this.queue.shift() as T;
    this.last = item;
    return item;
  }

  private refill() {
    const queue = [...this.items];
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    if (queue.length > 1 && queue[0] === this.last) {
      const swapWith = 1 + Math.floor(this.random() * (queue.length - 1));
      [queue[0], queue[swapWith]] = [queue[swapWith], queue[0]];
    }
    this.queue = queue;
  }
}
