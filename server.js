const { response } = require('express')
const express = require('express')
const dbConnect = require('./db')

const app = express()

const port = process.env.PORT || 3000

app.use(express.static('public'))

app.use(express.json())

dbConnect()
const Comments = require('./models/comments')
//routes
app.post('/api/comments', (req, res) => {
    const comment = new Comments({
        username: req.body.username,
        comment: req.body.comment
    })
    comment.save().then(response => {
        res.send(response)
    })
})

app.get('/api/comments', (req, res) => {
    Comments.find().then(comments => {
        res.send(comments)
    })
})


const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

let io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`new connection ${socket.id}`);
    //receive event
    socket.on('comment', (data) => {
        data.time = Date()
        socket.broadcast.emit('comment', data)
    })
})