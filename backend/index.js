// Importing the required modules
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000
const formData = require("express-form-data");
const os = require("os");

// Connecting to DB
require('./config/database')

// Middleware
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };
  

// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

// specifying the routes
app.use('/', require('./routes/users'))
app.use('/', require('./routes/recipes'))


// Running on the port 4000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})