const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

function addPerson() {

    var person = "Jones"

    return new Promise((resolve, reject) => {

        const find = `SELECT * from people where name = ? `
        connection.query(find, person, (error, result) => {
            if (error) reject(error)

            if ( result===undefined || result.length == 0) {
                const sql = `INSERT INTO people(name) VALUES('${person}')`;
                console.log(sql);
                connection.query(sql);
            }
            resolve()
        })
        
    })
}

function getAllPeople() {
    return new Promise((resolve, reject) => {
        
        const sql = `select * from people`;
        connection.query(sql, (error, result, fields) => {
            
            if(error) reject(error);
            
            resolve(result);
        });
    })
}

function main(req, res) {

    addPerson().then(() => {
        getAllPeople().then((people) => {
        
            var content = "<ul>";
            if (people.length > 0) {
                people.forEach(element => {
                    content+= `<li>id: ${element.id} - name: ${element.name}</li>`
                });
                content += "</ul>";
            }
        
            res.send('<h1>Full Cycle Rocks!</h1>' + content)
        })
    })
}


app.get('/', (req, res) => {
    main(req, res)
})

app.listen(port, () => {
    console.log('rodando na porta ' + port)
})