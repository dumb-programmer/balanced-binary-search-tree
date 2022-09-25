class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.#buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  #buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);
    root.left = this.#buildTree(array.slice(0, mid));
    root.right = this.#buildTree(array.slice(mid + 1));

    return root;
  }

  insert(data) {
    const node = new Node(data);
    if (!this.root) {
      this.root = node;
      return;
    }
    let current = this.root;
    while (current) {
      if (current.data === node.data) {
        return;
      } else if (current.data > node.data) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = node;
        }
      } else {
        if (current.right) {
          current = current.right;
        } else {
          current.right = node;
        }
      }
    }
  }

  #minVal(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  delete(item, node = this.root) {
    if (!node) return node;

    if (node.data < item) {
      node.right = this.delete(item, node.right);
    }
    else if (node.data > item) {
      node.left = this.delete(item, node.left);
    }

    else {
      if (!node.left) {
        return node.right;
      }
      else if (!node.right) {
        return node.left;
      }

      node.data = this.#minVal(node.right);

      node.right = this.delete(node.data, node.right);
    }
    return node;
  }

  find(value) {
    let current = this.root;
    while (current && current.data !== value) {
      if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return current;
  }

  levelOrder(cb = (x) => x) {
    const queue = [this.root];
    const nodes = [];
    while (queue.length !== 0) {
      const node = queue.shift();
      nodes.push(cb(node.data));
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return nodes;
  }

  levelOrderRecur(cb = (x) => x, queue = [this.root], nodes = []) {
    if (queue.length === 0) return nodes;

    const node = queue.shift();
    nodes.push(cb(node.data));

    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }

    return this.levelOrderRecur(cb, queue, nodes);
  }

  preorder(root = this.root, cb = null, array = []) {
    if (!root) return;
    if (cb === null) {
      array.push(root.data);
      this.preorder(root.left, null, array);
      this.preorder(root.right, null, array);
    } else {
      array.push(cb(root.data));
      this.preorder(root.left, cb, array);
      this.preorder(root.right, cb, array);
    }
    return array;
  }

  inorder(root = this.root, cb = null, array = []) {
    if (!root) return;
    if (cb === null) {
      this.inorder(root.left, null, array);
      array.push(root.data);
      this.inorder(root.right, null, array);
    } else {
      this.inorder(root.left, cb, array);
      array.push(cb(root.data));
      this.inorder(root.right, cb, array);
    }
    return array;
  }

  postorder(root = this.root, cb = null, array = []) {
    if (!root) return;

    if (!cb) {
      this.postorder(root.left, null, array);
      this.postorder(root.right, null, array);
      array.push(root.data);
    } else {
      this.postorder(root.left, cb, array);
      this.postorder(root.right, cb, array);
      array.push(cb(root.data));
    }

    return array;
  }

  height(node = this.root) {
    if (!node) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    let num = 0;
    let current = this.root;
    while (current.data !== node.data) {
      ++num;
      if (node.data > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return num;
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right)) {
      return true;
    }
    return false;
  }

  rebalance() {
    if (!this.isBalanced(this.root)) {
      const nodes = this.inorder(this.root);
      this.root = this.#buildTree(nodes);
    }
  }
}

module.exports = Tree;