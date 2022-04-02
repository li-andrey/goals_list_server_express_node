const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let goals = [
  {
    "id": 1648807448725,
    "achieved": true,
    "title": "Сделал MVP этого приложения",
    "date": "2022-04-02",
    "importance": "7"
  },
  {
    "id": 1648808058227,
    "achieved": false,
    "title": "Работаю web developer в хорошей компании",
    "date": "2022-06-01",
    "importance": "10"
  },
  {
    "id": 1648808096563,
    "achieved": false,
    "title": "На протяжении года хожу в бассейн > 2 раз в неделю",
    "date": "2023-01-01",
    "importance": "7"
  },
  {
    "id": 1648808265468,
    "achieved": false,
    "title": "Посетил планету Марс (не посмертно)",
    "date": "2053-12-31",
    "importance": "8"
  },
  {
    "id": 1648808309451,
    "achieved": false,
    "title": "Добавить возможность заносить цели в различные папки",
    "date": "2022-12-24",
    "importance": "4"
  },
  {
    "id": 1648812328316,
    "achieved": false,
    "title": "Съездил отдохнуть в Тайланд/Индонезия/Вьетнам/Корея",
    "date": "2022-12-31",
    "importance": "6"
  },
  {
    "id": 1648812345148,
    "achieved": false,
    "title": " Пробежал марофон",
    "date": "2022-12-23",
    "importance": "2"
  },
  {
    "id": 1648812368605,
    "achieved": false,
    "title": "6 дней в неделю делаю ЛФК",
    "date": "2022-12-29",
    "importance": "8"
  },
  {
    "id": 1648812514753,
    "achieved": true,
    "title": "Прочитал 5 бизнес-книг",
    "date": "2022-06-01",
    "importance": "7"
  },
  {
    "id": 1648812625828,
    "achieved": false,
    "title": "Начать зарабатывать > 100 тыс. руб. ежемесячно",
    "date": "2022-12-31",
    "importance": "9"
  }
]

app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/goals', (_request, response) => {
  response.json(goals)
})

const generateId = () => {
  const maxId = goals.length > 0
    ? Math.max(...goals.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/goals', (request, response) => {
  const body = request.body
  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const goal = {
    title: body.title,
    date: body.date,
    importance: body.importance,
    achieved: false,
    id: generateId(),
  }

  goals = goals.concat(goal)

  response.json(goal)
})

app.put('/api/goals/:id', (request, response, next) => {
  const body = request.body
  const achievedGoal = {
    ...body,
    achieved: true
  }
  goals = goals.map((g) => g.id !== achievedGoal.id ? g : achievedGoal)

  response.json(achievedGoal)
})

app.delete('/api/goals/:id', (request, response) => {
  const id = Number(request.params.id)
  goals = goals.filter(goal => goal.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})