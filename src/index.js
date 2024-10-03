module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const bracketsMap = {};
  const openBrackets = new Set();
  const sameBrackets = new Set();

  for (const [open, close] of bracketsConfig) {
    bracketsMap[close] = open;
    openBrackets.add(open);
    if (open === close) {
      sameBrackets.add(open);
    }
  }

  for (const char of str) {
    if (openBrackets.has(char)) {
      if (sameBrackets.has(char)) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          stack.push(char);
        }
      } else {
        stack.push(char);
      }
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== bracketsMap[char]) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}
