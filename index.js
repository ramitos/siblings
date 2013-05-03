var matches = require('matches-selector')
var getChildren = require('children')

module.exports = Siblings

function Siblings(el, selector) {
  return getChildren(el.parentNode, selector)
  .filter(function (sib) {
    return sib !== el
  })
}

Siblings.next = traverse('next')
Siblings.prev = traverse('prev')

function traverse(dir) {
  var prop = dir + 'ElementSibling'

  return function (el, selector, limit) {
    if (typeof selector === 'number') {
      limit = selector
      selector = null
    }

    var siblings = []
    var sibling = el

    while (true) {
      if (!(sibling = sibling[prop]))
        break

      if (selector && !matches(sibling, selector))
        continue

      if (limit && siblings.push(sibling) >= limit)
        break
    }

    return limit === 1 ? siblings.shift() : siblings
  }
}