const app = require('./server');

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log('server is running on port ' + port)
})