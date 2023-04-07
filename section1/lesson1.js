let head = null;
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function sortLinkList(head) {
  if (head == null || head.next == null) {
    return head;
  }

  // get the middle of the list
  const middle = getMiddle(head);
  const nextOfMiddle = middle.next;

  // set the next of middle node to null
  middle.next = null;

  // Apply mergeSort on left list
  const left = sortLinkList(head);

  const right = sortLinkList(nextOfMiddle);

  const sortedList = sortedMerge(left, right);
  return sortedList;
}

function sortedMerge(x, y) {
  let result = null;

  if (x == null) return y;
  if (y == null) return x;

  if (x.val <= y.val) {
    result = x;
    result.next = sortedMerge(x.next, y);
  } else {
    result = y;
    result.next = sortedMerge(x, y.next);
  }
  return result;
}

function getMiddle(head) {
  if (head == null) return head;

  let slow = head,
    fast = head;

  while (fast.next != null && fast.next.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

function addToTail(value) {
  const newNode = new Node(value);
  newNode.next = head;
  head = newNode;
}

function initLinklist(array) {
  for (let i = 0; i < array.length; i++) {
    addToTail(array[i]);
  }
}

function printLinklist(head) {
  const result = [];
  while (head != null) {
    result.push(head.val);
    head = head.next;
  }
  console.log("Linklist sorted:", result);
}

function validateInput(head) {
  let count = 0;
  while (head != null) {
    count++;
    if (head.val > 1000000 || head.val < -1000000) return false;
    if (count > 0.5 * 100000) return false;
    head = head.next;
  }

  return true;
}

console.log("Input", [-1, 5, 3, 4, 0]);
initLinklist([-1, 5, 3, 4, 0]);
const validate = validateInput(head);
console.log(validate);
if (validate) {
  head = sortLinkList(head);
  printLinklist(head);
} else {
  console.log("Please check your input");
}
