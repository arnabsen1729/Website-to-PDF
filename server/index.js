const express = require('express');
const {printPDF} = require('./pdfGen')
const cors = require('cors')
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000

app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.get('/api', (req, res)=>{
    console.log(req.query)
    printPDF(req.query['url']).then(pdf=>{
        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
        res.send(pdf)
        console.log('PDF Buffer sent')
    })
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
