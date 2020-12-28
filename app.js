const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const https = require('https')
const fs = require('fs')
const httpsOptions = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};
const app = express()

app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb', extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/discipline', require('./routes/discipline.routes'))
app.use('/api/teacher', require('./routes/teacher.routes'))
app.use('/api/student', require('./routes/student.routes'))
app.use('/api/tinfo', require('./routes/tinfo.routes'))
app.use('/api/student-page', require('./routes/studentPage.routes'))

if(process.env.NODE_ENV === 'production'){
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port')

async function start(){
  try{
    await mongoose.connect(config.get('mongoUri'),{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    https.createServer(httpsOptions, app).listen(PORT, () => console.log(`Port ${PORT} is running!`))
  }catch (e){
    console.log('Sever error:', e.message)
    process.exit(1)
  }
}

start()