const express = require('express')
const socketIO = require('socket.io')
const ejs = require('ejs')
const path = require('path')
const http = require('http')

const app = express()
const httpServer = http.createServer(app)
const io = socketIO(httpServer)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
  res.render('index.html')
})

io.on('connection', socket => {
  console.log(`Socket connectado: ${socket.id}`)
})

httpServer.listen(3000, console.log('Server running'))
