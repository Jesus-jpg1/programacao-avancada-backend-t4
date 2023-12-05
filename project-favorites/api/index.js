const http = require('http')
const fs = require('fs')
const path = require('path')

const data = require('./urls.json')

const URL = require('url')

http.createServer((req, res) => {

    const file = req.url === '/' ? 'urls.json' : req.url
    const filePath = path.join(__dirname, file)

    const {name, url, del} = URL.parse(req.url, true).query

    // const extname = path.extname(filePath)
    // const allowedFilesTypes = [ '.json' ]
    // const allowed = allowedFilesTypes.find( item => item == extname )
    // if(!allowed) return

    function writeFile(cb) {
        fs.writeFile(
            path.join(__dirname, 'urls.json'),
            JSON.stringify(data, null, 2),
            err => {
                if (err) throw err
                cb('Operação realizada com sucesso!')
            }
        )
    }


    if(!name || !url)
        return res.end(JSON.stringify(data))

    if(del)
        return writeFile(message => res.end(message))

    return writeFile(data.urls.push({name, url}))

    
}).listen(3000, ()=>console.log('A API está rodando!'))
