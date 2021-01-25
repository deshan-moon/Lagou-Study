const fp = require('lodash/fp')
const f = fp.flowRight(fp.replace(/\s+/g,'_'),fp.toUpper)
console.log(f('happly new year!'))

// 案例
const flt = fp.flowRight(fp.join('. '),fp.map(fp.flowRight(fp.first,fp.toUpper)),fp.split(' '))
console.log(flt('happly new year!'))
