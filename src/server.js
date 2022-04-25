const express = require('express')
const cors = require('cors')
const mongoConnecter = require('./configs/db')


const petHouseController = require('./controllers/petHouse.controller')
const { register, login } = require('./controllers/user.controller')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 7000


//routes
app.use('/', petHouseController)
app.use('/signup',register)
app.use('/signin', login)


module.exports = ()=>{
    app.listen(PORT, async ()=>{
        try {
            await mongoConnecter()
            console.log(`Server is listening on the port ${PORT}`)
        } catch (error) {
            console.log({
                message : error.message
            })
        }
    })
}



