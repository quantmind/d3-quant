import {test} from 'tape';
import {binaryTree} from '../index';


test('test btree constructor', (t) => {
    var tree = binaryTree();
    t.equal(tree.size(), 0);
    t.equal(tree.maxDepth(), 0);
    t.end();
});


test('test btree insert', (t) => {
    var tree = binaryTree();
    tree.insert(0.5);
    t.equal(tree.size(), 1);
    t.equal(tree.maxDepth(), 0);

    tree.insert(0.2);
    t.equal(tree.size(), 2);
    t.equal(tree.maxDepth(), 1);
    tree.insert(0.3);
    t.equal(tree.size(), 3);
    t.equal(tree.maxDepth(), 1);

    t.equal(tree.root.score, 0.3);

    var nodes = tree.nodes();
    t.equal(nodes.length, 3);
    t.end();
});
