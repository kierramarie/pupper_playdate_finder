const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const path = require('path')
const app = express()

const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcerPromise = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcerPromise)

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path, req.headers, req.body)
  next()
})

app.use(enforcerMiddleware.init({ baseUrl: '/api' }))

app.post('/accounts', async (req, res) => {
  const { body, mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const accounts = (await mockStore.get('accounts')) || []
    users.push(body)
    await mockStore.set('accounts', accounts)
    res.enforcer.send(accounts)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.put('/accounts/{id}', async (req, res) => {
  const { body, mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const accounts = (await mockStore.get('accounts')) || []
    users.push(body)
    await mockStore.set('accounts', accounts)
    res.enforcer.send(accounts)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.post('/accounts/{id}/pics', async (req, res) => {
  const { body, mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const accounts = (await mockStore.get('accounts')) || []
    users.push(body)
    await mockStore.set('accounts', accounts)
    res.enforcer.send(accounts)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.delete('/accounts/{id}/pics/{pic_id}', async (req, res) => {
  const { mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const users = (await mockStore.get('users')) || []
    res.enforcer.send(users)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.put('/accounts/login', async (req, res) => {
  const { body, mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const accounts = (await mockStore.get('accounts')) || []
    users.push(body)
    await mockStore.set('accounts', accounts)
    res.enforcer.send(accounts)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.put('/accounts/{id}/logout', async (req, res) => {
  const { body, mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const accounts = (await mockStore.get('accounts')) || []
    users.push(body)
    await mockStore.set('accounts', accounts)
    res.enforcer.send(accounts)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.post('/chats', async (req, res) => {
  const { body, mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const accounts = (await mockStore.get('accounts')) || []
    users.push(body)
    await mockStore.set('accounts', accounts)
    res.enforcer.send(accounts)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.get('/chats/{chat_id}', async (req, res) => {
  const { mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const users = (await mockStore.get('users')) || []
    res.enforcer.send(users)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.put('/chats/{chat_id}', async (req, res) => {
  const { body, mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const accounts = (await mockStore.get('accounts')) || []
    users.push(body)
    await mockStore.set('accounts', accounts)
    res.enforcer.send(accounts)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.delete('/chats/{chat_id}', async (req, res) => {
  const { mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const users = (await mockStore.get('users')) || []
    res.enforcer.send(users)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

app.put('/chats/{chat_id}/send', async (req, res) => {
  const { body, mockStore } = req.enforcer

  // this request is a request for a mocked response
  if (mockStore) {
    const accounts = (await mockStore.get('accounts')) || []
    users.push(body)
    await mockStore.set('accounts', accounts)
    res.enforcer.send(accounts)  

  } else {
    // ... run non-mocked processing here
    res.enforcer.send([])
  }
})

enforcerMiddleware.on('error', err => {
  console.error(err)
  process.exit(1)
}) 

app.use(enforcerMiddleware.mock())

module.exports = app