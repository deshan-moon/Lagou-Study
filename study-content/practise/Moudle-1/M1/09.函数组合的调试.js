const _ = require('lodash')
const split = _.curry((sep,str) => _.split(str,sep))
const map = _.curry((fn,array) => _.map(array,fn))
const join = _.curry((fn,array) => _.join(array,fn))

const trace = _.curry((fnName,v) => {
  console.log(fnName,v)
  return v
})

// const f = _.flowRight(join('-'),trace('map:'),map(_.toLower),trace('split:'),split(' '))

const fp = require('lodash/fp')
const f = fp.flowRight(fp.join('-'),trace('map:'),fp.map(fp.toLower),trace('split:'),fp.split(' '))

console.log(f('NEW SAY DAY'))