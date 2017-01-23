export default function btree () {
    return new Btree();
}


function Btree () {
    this.root = null;
}


function Node (node) {
    this.score = typeof(node) == 'number' ? node : node.score;
    this.value = node.value;
    this.parent = null;
    this.left = null;
    this.right = null;
    this.red = false;

    Object.defineProperty(this, 'root', {
        get: function () {
            return this.parent ? this.parent.root : this;
        }
    });
}


Btree.prototype = btree.prototype = {

    insert (node, callback) {
        if (!this.root) {
            this.root = new Node(node);
            if (callback) callback(this.root);
        }
        else
            this.root = this.root.insert(node, callback);
    },
    size () {
        return this.root ? this.root.size() : 0;
    },
    maxDepth () {
        return this.root ? this.root.maxDepth() : 0;
    },
    traverse (callback) {
        this.root ? this.root.traverse(callback) : null;
    },
    traverseInOrder (callback) {
        this.root ? this.root.traverseInOrder(callback) : null;
    },
    nodes () {
        return this.root ? this.root.nodes() : [];
    },
    links () {
        return this.root ? this.root.links() : [];
    }
};


Node.prototype = {

    insert: function (node, callback) {
        var score = typeof(node) == 'number' ? node : node.score,
            nd;

        if (score > this.score) {
            if (this.right) return this.right.insert(node);
            else this.right = nd = new Node(score);
        } else {
            if (this.left) return this.left.insert(node);
            else this.left = nd = new Node(score);
        }
        nd.red = true;
        nd.parent = this;
        var root = rb_insert_fix(nd);
        if (callback) callback(nd);
        return root;
    },

    size () {
        var count = 0;
        this.traverse(() => {count++;});
        return count;
    },

    depth () {
        if (this.parent) return this.parent.depth() + 1;
        else return 0;
    },

    maxDepth () {
        var dl = this.left ? this.left.maxDepth() + 1 : 0,
            dr = this.right ? this.right.maxDepth() + 1 : 0;
        return Math.max(dl, dr);
    },

    traverse (callback) {
        callback(this);
        if (this.left) this.left.traverse(callback);
        if (this.right) this.right.traverse(callback);
    },

    traverseInOrder (callback) {
        if (this.left) this.left.traverseInOrder(callback);
        callback(this);
        if (this.right) this.right.traverseInOrder(callback);
    },

    nodes () {
        var nodes = [];
        this.traverseInOrder((node) => {nodes.push(node);});
        return nodes;
    },

    links () {
        var links = [];
        this.traverse(function (node) {
            if (node.parent)
                links.push({
                    source: node.parent.index,
                    target: node.index
                });
        });
        return links;
    }
};


function rb_insert_fix (z) {
    var y;

    if (!z.parent || !z.parent.red) {
        z = z.root;
        z.red = false;
        return z;
    }

    if (z.parent === z.parent.parent.left) {
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
            z.parent.red = false;
            z.parent.parent.red = true;
            right_rotate(z.parent.parent);
        }
    } else {
        y = z.parent.parent.left;
        if (y && y.red) {
            z.parent.red = false;
            y.red = false;
            z.parent.parent.red = true;
            z = z.parent.parent;
        } else {
            if (z === z.parent.left) {
                z = z.parent;
                right_rotate(z);
            }
            z.parent.red = false;
            z.parent.parent.red = true;
            left_rotate(z.parent.parent);
        }
    }

    return rb_insert_fix(z);
}


function left_rotate (x) {
    var y = x.right;
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


function right_rotate (x) {
    var y = x.left;
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
