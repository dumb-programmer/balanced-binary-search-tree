const Tree = require("../src/balancedBinarySearchTree");

it("balanced tree is constructed from an array", () => {
    const tree = new Tree([10, 20, 40, 5]);
    expect(tree.isBalanced()).toBeTruthy();
});

it("key is inserted at its proper location in the tree", () => {
    const tree = new Tree([10, 20, 40, 5]);
    tree.insert(2);
    tree.insert(50);
    expect(tree.root.left.left.left.data).toEqual(2);
    expect(tree.root.right.right.data).toEqual(50);
});

it("preorder works", () => {
    const tree = new Tree([10, 20, 40, 5]);
    expect(tree.preorder()).toEqual([20, 10, 5, 40]);
    expect(tree.preorder(tree.root, (x) => x * 2)).toEqual([40, 20, 10, 80]);
});

it("inorder works", () => {
    const tree = new Tree([10, 20, 40, 5]);
    expect(tree.inorder()).toEqual([5, 10, 20, 40]);
    expect(tree.inorder(tree.root, (x) => x * 2)).toEqual([10, 20, 40, 80]);
});

it("postorder works", () => {
    const tree = new Tree([10, 20, 40, 5]);
    expect(tree.postorder()).toEqual([5, 10, 40, 20]);
    expect(tree.postorder(tree.root, (x) => x * 2)).toEqual([10, 20, 80, 40]);
});

it("levelorder works", () => {
    const tree = new Tree([10, 20, 40, 5]);
    expect(tree.levelOrder()).toEqual([20, 10, 40, 5]);
    expect(tree.levelOrder((x) => x * 2)).toEqual([40, 20, 80, 10]);
    expect(tree.levelOrderRecur()).toEqual([20, 10, 40, 5]);
    expect(tree.levelOrderRecur((x) => x * 2)).toEqual([40, 20, 80, 10]);
})


it("tree property remains intact after deletion", () => {
    const tree = new Tree([10, 20, 40, 5]);
    tree.delete(20);
    expect(tree.inorder()).toEqual([5, 10, 40]);
});

it("find returns a node with the given value", () => {
    const tree = new Tree([10, 20, 40, 5]);
    expect(tree.find(5)).toEqual({ data: 5, left: null, right: null });
});

it("height works", () => {
    const tree = new Tree([10, 20, 40, 5]);
    expect(tree.height()).toEqual(2)
});

it("depth works", () => {
    const tree = new Tree([10, 20, 40, 5]);
    expect(tree.depth(tree.root)).toEqual(0);
    expect(tree.depth(tree.root.left)).toEqual(1);
    expect(tree.depth(tree.root.left.left)).toEqual(2);
});

it("rebalance works", () => {
    const tree = new Tree([10, 20, 40, 5]);
    tree.insert(2);
    tree.insert(1);
    expect(tree.isBalanced()).toBeFalsy();
    tree.rebalance();
    expect(tree.isBalanced()).toBeTruthy();
});