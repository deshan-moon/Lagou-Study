const { split } = require('lodash')
const fp = require('lodash/fp')
//horsepower马力  dollar_value价格  in_stock库存
const cars = [
  {name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  {name: "Spyker c12 zagato", horsepower: 650, dollar_value: 648000, in_stock: false }, 
  {name: 'Jaguar XKR-s', horsepower: 550, dollar_value: 132000, in_stock: false}, 
  {name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin one-77", horsepower: 750, dollar_value: 1850000, in_stock: true }, 
  {name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: true }]
// 练习3
let _average = function(xs){
  return fp.reduce(fp.add,0,xs) / xs.length
}
// 改造前
let averageDollarValue = function (cars){
  let dollar_values = fp.map(function(car){
    return car.dollar_value
  },cars)
  return _average(dollar_values)
}
console.log(averageDollarValue(cars));
//改造后
let averageDollarValue2 = function (cars){
  let f = fp.flowRight(_average,fp.map(car => car.dollar_value))
  return f(cars)
}
console.log(averageDollarValue2(cars));
