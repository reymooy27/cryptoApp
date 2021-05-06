const express = require('express')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const axios = require('axios')

const app = express()

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(compression())
app.use(helmet())

app.get('/', async (req,res)=>{
  try {
    await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',{
    headers:{'X-CMC_PRO_API_KEY': '4e8d9cf5-de76-4852-82f5-db228109a771'}
    })
    .then(data=>{
      return res.status(200).json(data.data)
    })
    .catch(err=>{
      console.log(err)
      return res.status(400).json(err.message)
    })
  } catch (error) {
    return res.status(400).json(err.message)
  }
  
})

app.listen(PORT, ()=> console.log('Server run on port ' + PORT))