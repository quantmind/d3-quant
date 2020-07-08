import { binaryTree } from "../src";

describe("Btree", () => {
  test("test btree constructor", () => {
    const tree = binaryTree();
    expect(tree.score).toBe(0);
    expect(tree.size).toBe(0);
    expect(tree.depth).toBe(0);
    expect(tree.maxDepth).toBe(0);
  });

  test("test btree insert", () => {
    const tree = binaryTree();
    tree.insert(0.5);
    expect(tree.size).toBe(1);
    expect(tree.maxDepth).toBe(0);
    expect(tree.score).toBe(0.5);

    tree.insert(0.2);
    expect(tree.size).toBe(2);
    expect(tree.maxDepth).toBe(1);
    tree.insert(0.3);
    expect(tree.size).toBe(3);
    expect(tree.maxDepth).toBe(1);

    expect(tree.score).toBe(0.3);

    const nodes = tree.nodes();
    expect(nodes.length).toBe(3);
  });
});
