var maxProduct = function (nums) {
  const validate = validateInput(nums);
  if (!validate) return 0;
  const length = nums.length;
  let max = nums[0];
  for (let i = 0; i < length; i++) {
    let t = 1;
    for (let j = i; j < length; j++) {
      t *= nums[j];
      if (max < t) {
        max = t;
      }
    }
  }
  return max;
};

function validateInput(inputs) {
  if (inputs.length < 1 || inputs.length > 2 * 104) return false;
  if (inputs.some((input) => input > 10) || inputs.some((input) => input < -10))
    return false;

  return true;
}
const nums = [2, 3, -2, 4];

console.log(maxProduct(nums));
