const Tree = require("./balancedBinarySearchTree");

const getRandomNumbers = (n) => {
    const array = [];
    for (let i = 0; i < n; i++) {
        array.push(Math.ceil(Math.random() * 100));
    }
    return array;
};

const main = () => {
    const tree = new Tree(getRandomNumbers(20));
    console.log(tree);
    // console.log(tree.isBalanced());
    // console.log("--------- Preorder ----------");
    // console.log(tree.preorder());
    // console.log("--------- Inorder -----------");
    // console.log(tree.inorder());
    // console.log("--------- Postorder ---------");
    // console.log(tree.postorder());

    // for (let i = 100; i < 200; i += 10) {
    //     tree.insert(i);
    // }
    // console.log(tree.isBalanced());
    // tree.rebalance();
    // console.log(tree.isBalanced());

    // console.log("--------- Preorder ----------");
    // console.log(tree.preorder());
    // console.log("--------- Inorder -----------");
    // console.log(tree.inorder());
    // console.log("--------- Postorder ---------");
    // console.log(tree.postorder());
}

main();