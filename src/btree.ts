export default (): BtreeNode => {
  return new Btree();
};

export interface BtreeNode {
  score: number;
  size: number;
  depth: number;
  maxDepth: number;
  root: BtreeNode | undefined;
  insert: (value: any, callback?: any) => void;
  traverse: (callback?: any) => void;
  traverseInOrder: (callback?: any) => void;
  nodes: () => BtreeNode[];
  links: () => Record<string, any>[];
}

class Btree implements BtreeNode {
  root: Node | undefined;

  constructor() {
    this.root = undefined;
  }

  insert(value: any, callback?: any) {
    if (!this.root) {
      this.root = new Node(value);
      if (callback) callback(this.root);
    } else this.root = this.root.insert(value, callback);
  }

  get score() {
    return this.root ? this.root.score : 0;
  }

  get size() {
    return this.root ? this.root.size : 0;
  }

  get depth(): number {
    return this.root ? this.root.depth : 0;
  }

  get maxDepth() {
    return this.root ? this.root.maxDepth : 0;
  }

  traverse(callback?: any) {
    this.root ? this.root.traverse(callback) : null;
  }

  traverseInOrder(callback?: any) {
    this.root ? this.root.traverseInOrder(callback) : null;
  }

  nodes() {
    return this.root ? this.root.nodes() : [];
  }

  links() {
    return this.root ? this.root.links() : [];
  }
}

class Node implements BtreeNode {
  score: number;
  value: any;
  parent: Node | undefined;
  left: Node | undefined;
  right: Node | undefined;
  red: boolean;

  constructor(node: any) {
    this.score = typeof node == "number" ? node : node.score;
    this.value = node.value;
    this.parent = undefined;
    this.left = undefined;
    this.right = undefined;
    this.red = false;
  }

  get root(): Node {
    return this.parent ? this.parent.root : this;
  }

  get size(): number {
    let count = 0;
    this.traverse(() => {
      count++;
    });
    return count;
  }

  get depth(): number {
    if (this.parent) return this.parent.depth + 1;
    else return 0;
  }

  get maxDepth(): number {
    const dl = this.left ? this.left.maxDepth + 1 : 0,
      dr = this.right ? this.right.maxDepth + 1 : 0;
    return Math.max(dl, dr);
  }

  insert(node: Node, callback?: any): Node {
    const score = typeof node == "number" ? node : node.score;
    let nd: Node;

    if (score > this.score) {
      if (this.right) return this.right.insert(node);
      else this.right = nd = new Node(score);
    } else {
      if (this.left) return this.left.insert(node);
      else this.left = nd = new Node(score);
    }
    nd.red = true;
    nd.parent = this;
    const root = rb_insert_fix(nd);
    if (callback) callback(nd);
    return root;
  }

  traverse(callback: any) {
    callback(this);
    if (this.left) this.left.traverse(callback);
    if (this.right) this.right.traverse(callback);
  }

  traverseInOrder(callback: any) {
    if (this.left) this.left.traverseInOrder(callback);
    callback(this);
    if (this.right) this.right.traverseInOrder(callback);
  }

  nodes(): Node[] {
    const nodes: Node[] = [];
    this.traverseInOrder((node: Node) => {
      nodes.push(node);
    });
    return nodes;
  }

  links(): Record<string, any>[] {
    const links: any[] = [];
    this.traverse((node: any) => {
      if (node.parent)
        links.push({
          source: node.parent?.index,
          target: node.index,
        });
    });
    return links;
  }
}

function rb_insert_fix(zi: Node): Node {
  let y: Node | undefined;
  let z: Node | undefined = zi;

  if (!z.parent || !z.parent.red) {
    z = z.root;
    z.red = false;
    return z;
  }

  if (z.parent === z.parent.parent?.left) {
    y = z.parent.parent.right;
    if (y && y.red) {
      z.parent.red = false;
      y.red = false;
      z.parent.parent.red = true;
      z = z.parent.parent;
    } else {
      if (z === z.parent.right) {
        z = z.parent;
        left_rotate(z);
      }
      if (z.parent) {
        z.parent.red = false;
        if (z.parent.parent) {
          z.parent.parent.red = true;
          right_rotate(z.parent.parent);
        }
      }
    }
  } else {
    y = z.parent.parent?.left;
    if (y && y.red) {
      z.parent.red = false;
      y.red = false;
      (z.parent.parent as Node).red = true;
      z = z.parent.parent;
    } else {
      if (z === z.parent.left) {
        z = z.parent;
        right_rotate(z);
      }
      if (z.parent) {
        z.parent.red = false;
        if (z.parent.parent) {
          z.parent.parent.red = true;
          left_rotate(z.parent.parent);
        }
      }
    }
  }

  return rb_insert_fix(z as Node);
}

function left_rotate(x: Node) {
  const y = x.right as Node;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (x.parent) {
    if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
  }
  y.left = x;
  x.parent = y;
}

function right_rotate(x: Node) {
  const y = x.left as Node;
  x.left = y.right;
  if (y.right) y.right.parent = x;
  y.parent = x.parent;
  if (x.parent) {
    if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
  }
  y.right = x;
  x.parent = y;
}
