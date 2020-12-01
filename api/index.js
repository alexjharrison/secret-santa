import express, { json } from 'express'
import fs from 'fs/promises'
import path from 'path'
import sendSantas from './sendSantas'
import sendAlexMessage from './sendAlexMessage'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const fetchData = async () => {
  const db = await fs.readFile(path.join(__dirname, './db.json'))
  return JSON.parse(db)
}

const writeData = async db => {
  return fs.writeFile(path.join(__dirname, './db.json'), JSON.stringify(db))
}

app.get('/', async (req, res) => {
  res.json(await fetchData())
})

app.post('/', async (req, res) => {
  const db = await fetchData()
  const { id, address, email, answers, disincludes } = req.body
  const index = id - 1

  db[index] = {
    id: Number(id),
    name: db[index].name,
    address,
    email,
    answers,
    disincludes: disincludes.map(id => Number(id)),
  }
  sendAlexMessage(db[index])
  await writeData(db)
  if (db.every(user => user.address !== null)) {
    const santas = await sendSantas(db)
    res.json(santas)
    return
  }

  res.json(db)
})

export default app
