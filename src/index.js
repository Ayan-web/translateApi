const app = require('./server')
require('dotenv').config()

const PORT = process.env.PORT
app.listen(
		PORT,
		()=> console.log(`listening on http://localhost:${PORT}`)
	)