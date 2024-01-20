
const mysql = require('mysql')
const util = require('util')

const config = {
  host     : 'db',
  user     : 'root',
  password : 'root',
  database : 'nodedb'
};

const createConnection = () => {
  const connection = mysql.createConnection(config);
  return {
    query: util.promisify(connection.query).bind(connection),
    end: util.promisify(connection.end).bind(connection),
  };
};

async function addUser(username) {
  const sql = `INSERT INTO people(name) values('${username}')`
  const connection = createConnection()
  await connection.query(sql);
  await connection.end();
  console.log('User created!');
}

async function createTable(tableName) {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id));`;
  const connection = createConnection()
  await connection.query(sql);
  await connection.end();
}

async function getAllUsers() {
  const connection = createConnection()
  const sql = `SELECT id,name FROM people;`
  const users = await connection.query(sql);
  await connection.end();

  return users;
}

module.exports = {
  addUser,
  createTable,
  getAllUsers,
}