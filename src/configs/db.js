const {connect} = require('mongoose')
// const db = `mongodb://localhost:27017/petboarddb`
const db = `mongodb+srv://vijendra:vijendra@cluster0.mpexw.mongodb.net/apartmentmanagement?retryWrites=true&w=majority`
module.exports = ()=>connect(db)
