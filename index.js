const express = require('express')
const cors = require('cors')
const { logger } = require('./middlewares/authMiddleware')

const PORT = 3001
let notes = [
  {
    id: 1,
    content: 'Tengo que estudiar las midu-clases',
    date: '2019-06-30T19:20:14:298Z',
    important: true
  },
  {
    id: 2,
    content: 'Tengo que estudiar  calculo dif',
    date: '2018-09-21T19:20:14:298Z',
    important: true
  },
  {
    id: 3,
    content: 'dormir',
    date: '2021-10-21T19:20:14:298Z',
    important: false
  }
]
const app = express()
app.use(express.json())
app.use(logger)
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo </h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id * 1
  console.log({ id })
  const note = notes.find(note => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id * 1
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content || note.content === '') {
    res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()

  }

  notes = [...notes, newNote]

  console.log(newNote)
  res.status(201).json(newNote)
})

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found Error 404'
  })
})
