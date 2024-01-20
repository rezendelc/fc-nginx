const express = require('express')
const app = express()
const port = 3000
const db = require('./dbUseCases')

db.createTable('people')

app.get('/', async function (_req, res) {
  await db.addUser('User');
  const users = await db.getAllUsers();
  res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${
        users.map(user => {
          return `<li> ${user.name} ${user.id}</li>`
        }).join('')
      }
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
