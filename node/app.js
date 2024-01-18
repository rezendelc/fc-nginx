const express = require('express')
const app = express()
const port = 3000
const db = require('./db')

db.createTable('people')

app.get('/', async function (_req, res) {
  await db.addUser('Username');
  const users = await db.getAllUsers();
  res.send(`
    <h1>Full Cycle Rocks!</h1>
    ${users.map(user => {
      return `<span> ${user.name}</span>`
    })}
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
