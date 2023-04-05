function reversePolish(tokens) {
  const validate = validateInput(tokens);
  if (!validate) return 0;
  const stack = [];
  const character = ["+", "-", "*", "/"];
  const arrayValue = tokens.map((element) => {
    if (!character.includes(element)) {
      stack.push(parseInt(element));
    } else {
      let pop2 = parseInt(stack.pop());
      let pop1 = parseInt(stack.pop());
      if (element == "+") stack.push(pop1 + pop2);
      else if (element == "*") stack.push(pop1 * pop2);
      else if (element == "-") stack.push(pop1 - pop2);
      else stack.push(parseInt(pop1 / pop2));
    }
    return parseInt(stack[stack.length - 1]);
  });
  return arrayValue.pop();
}

function validateInput(inputs) {
  if (inputs.length < 1 || inputs.length > 104) return false;
  if (
    inputs.some((input) => input > 200) ||
    inputs.some((input) => input < -200)
  )
    return false;

  return true;
}

const tokens = ["4", "2", "+", "5", "*"];
console.log(reversePolish(tokens));
