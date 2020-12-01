const fs = require('fs/promises')
const path = require('path')

export default () => {
  return fs
    .readFile(path.join(__dirname, './db.json'))
    .then(JSON.parse)
    .then(sort)
}

async function sort(db) {
  while (true) {
    const validAnswer = test(db)
    if (validAnswer) {
      await fs.writeFile(
        path.join(__dirname, './db.results.json'),
        JSON.stringify(validAnswer)
      )
      return validAnswer
    }
  }
}

function test(db) {
  const arr = randomize()
  const isValid = db.every(
    (user, i) => !user.disincludes.includes(arr[i]) && arr[i] !== user.id
  )
  return (
    isValid &&
    db.map((user, i) => ({
      ...user,
      match: db.find(user => user.id === arr[i]),
    }))
  )
}

function randomize() {
  const arr = []
  for (let i = 1; i <= 10; i++) {
    const idx = Math.floor(Math.random() * i)
    arr.splice(idx, 0, i)
  }
  return arr
}
