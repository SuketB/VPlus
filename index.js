const express = require('express')
const app = express()
const path = require('path')
const method_override = require('method-override')
const mongoose = require('mongoose')
const ejs = require('ejs')
const PendingRequest = require('./Model/PendingRequest')
const dotenv = require('dotenv').config()
const Visitor = require('./Model/Visitor')

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(method_override('_method'))
app.use(express.static(path.join(__dirname, 'public')))


mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
  console.log('db connected')
})
app.get('/', (req, res) => {
  res.render('index')
})
app.get('/visitor', (req, res) => {
  res.render('visitor')
})
app.get('/login', (req, res) => {
  res.render('Admin')
})
app.post('/login',(req,res)=>{
  res.render('adminLanding')
})
app.get('/admin', (req, res) => {
  res.render('adminLanding')
})
app.get('/pending-request', async (req, res) => {
  const requests = await PendingRequest.find()
  console.log(requests)
  res.render('verification', { requests })
})
app.get('/visitors',async (req, res) => {
  const requests = await Visitor.find()
  res.render('visitorDetail',{requests})
})
app.get('/pass-destroy', (req, res) => {
  res.render('passDestroy')
})

app.post('/pending-request', async(req, res) => {
  const { name, age, email, idType, id, venue, days } = req.body
  console.log(req.body)
  const request = new PendingRequest({
    name,
    age,
    email,
    idType,
    idNumber: id,
    venue,
    days,
  })
  await request.save()

  res.redirect('/')
})
app.get('/accept/:id', async(req, res) => {
  const {id} = req.params
  const pendingVisitor = await PendingRequest.findById(id)
  const { name, age, email, idType, idNumber, venue, days } = pendingVisitor
  await PendingRequest.deleteOne({_id: id})
  const visitor = new Visitor({
    name,
    age,
    email,
    idType,
    idNumber,
    venue,
    days,
  })
  await visitor.save()
  res.redirect('/pending-request')
})
app.get('/reject/:id',async (req, res) => {
 const {id} = req.params
  await PendingRequest.deleteOne({_id: id})
  res.redirect('/pending-request')
})

app.post('/deletePass', async (req, res) => {
  const {id}  = req.body
  await Visitor.deleteOne({ _id: id })
  res.redirect('/visitors')
})

const PORT = process.env.PORT || 5000

app.listen(`${PORT}`, () => {
  console.log(`Running on port ${PORT}`)
})
