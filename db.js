const mongoose = require('mongoose')
function dbConnect() {
    //connect to database
    const url = 'mongodb://localhost:27017/comments?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

    mongoose.connect(url)

    const connection = mongoose.connection
    connection.once('open', () => {
        console.log('database connected');
    })
}
module.exports = dbConnect