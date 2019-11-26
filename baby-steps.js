const numbers = process.argv.splice(2)
console.log(numbers.reduce((x,Number(y))=> (0, x+y)))
console.log(process.argv.splice(2))

