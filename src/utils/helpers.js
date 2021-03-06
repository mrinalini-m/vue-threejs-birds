function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

function validateColor(c) {
  return c.hasOwnProperty('r') && c.hasOwnProperty('g') && c.hasOwnProperty('b')
}

function inRange(val, min, max) {
  return val >= min && val <= max
}

function flipCoin() {
  return Math.floor(Math.random() * 2)
}

export { clamp, validateColor, inRange, flipCoin }
