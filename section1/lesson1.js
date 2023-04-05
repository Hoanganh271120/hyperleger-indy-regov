function LinkList() {
    this.head = null;
    this.tail = null;
  }
  
  function Node(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
  
  LinkList.prototype.addToTail = function (value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  };
  
  LinkList.prototype.display = function () {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode);
      currentNode = currentNode.next;
    }
  };
  
  LinkList.prototype.validate = function () {
    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      count++;
      if (currentNode.value > 1000000 || currentNode.value < -1000000)
        return false;
      if (count > 0.5 * 100000) return false;
      currentNode = currentNode.next;
    }
  
    return true;
  };
  
  LinkList.prototype.sortLinklist = function () {
    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }
    let nodeI = this.head;
    for (i = 0; i < count - 1; i++) {
      let nodeJ = nodeI.next;
      for (j = i + 1; j < count; j++) {
        if (nodeI.value > nodeJ.value) {
          swap(nodeI, nodeJ);
        }
        nodeJ = nodeJ.next;
      }
      nodeI = nodeI.next;
    }
  };
  
  function swap(x, y) {
    let temp = x.value;
    x.value = y.value;
    y.value = temp;
  }
  
  const head = [4, 2, 1, 3];
  
  const linkList = new LinkList();
  head.forEach((e) => linkList.addToTail(e));
  const validate = linkList.validate();
  if (validate) {
    linkList.sortLinklist();
    linkList.display();
  } else {
    console.log("Bad input");
  }
  

