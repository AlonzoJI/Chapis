// Run with: node --test app/lib/shuffleBag.test.ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ShuffleBag } from './shuffleBag.ts';

const ITEMS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

test('each cycle uses every item exactly once', () => {
  const bag = new ShuffleBag(ITEMS);
  for (let cycle = 0; cycle < 50; cycle++) {
    const drawn = ITEMS.map(() => bag.next());
    assert.deepEqual([...drawn].sort(), [...ITEMS].sort());
  }
});

test('a new cycle never starts with the last item of the previous one', () => {
  const bag = new ShuffleBag(ITEMS);
  let previous = bag.next();
  for (let i = 0; i < 5000; i++) {
    const current = bag.next();
    assert.notEqual(current, previous, `repeat at draw ${i}`);
    previous = current;
  }
});

test('the boundary rule holds even when the shuffle tries to repeat', () => {
  // A random() that always returns 0.999 makes the shuffle an identity-like
  // permutation, which is the worst case for boundary repeats.
  const bag = new ShuffleBag(['x', 'y', 'z'], () => 0.999);
  const draws = Array.from({ length: 30 }, () => bag.next());
  for (let i = 1; i < draws.length; i++) assert.notEqual(draws[i], draws[i - 1]);
});

test('a single item bag keeps returning that item', () => {
  const bag = new ShuffleBag(['only']);
  assert.deepEqual([bag.next(), bag.next(), bag.next()], ['only', 'only', 'only']);
});

test('an empty bag is rejected', () => {
  assert.throws(() => new ShuffleBag([]));
});
