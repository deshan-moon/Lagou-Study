const {
  split
} = require('lodash')
const fp = require('lodash/fp')
//horsepower马力  dollar_value价格  in_stock库存
const cars = [
  {name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  {name: "Spyker c12 zagato", horsepower: 650, dollar_value: 648000, in_stock: false }, 
  {name: 'Jaguar XKR-s', horsepower: 550, dollar_value: 132000, in_stock: false}, 
  {name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin one-77", horsepower: 750, dollar_value: 1850000, in_stock: true }, 
  {name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: true }]
// 例子
let isLastInStock = function (cars) {
  let last_car = fp.last(cars)
  return fp.prop('in_stock', last_car)
}
// console.log(isLastInStock(cars));
// 练习1
let isLastInStock2 = function (cars) {
  let f = fp.flowRight(fp.prop('in_stock'), fp.last)
  return f(cars)
}
console.log(isLastInStock2(cars));