// comment

if (true) {
  let foo = 123
  console.log(foo)
}

const student = 'Bob'
const teacher = 'Winter'
function say () {
  console.log('winter is coming')
}

export var a = 1
export const b = 9
export let c = 100
export function hello () {
  console.log('hello world')
}
export default a + b + c
export {student as anotherStudent, teacher, say}
