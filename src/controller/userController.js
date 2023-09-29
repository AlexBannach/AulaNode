const mysql = require('mysql2/promise');
const databaseConfig = require('../config/database');

async function CreateUser ( req, res) {
    const { name, password } = req.query;

    try {
        const connection = await mysql.createConnection(databaseConfig);
        const insertUser =  `INSERT INTO user (name, password)
                                values(?, ?)`;
        await connection.query(insertUser, [name, password]);
        await connection.end();

        res.status(201).send({message: 'success'});

    } catch (error) {
        res.status(500).send(
            {
                message: 'Error adding user!',
                body: error.message,
            }
        );
    }
}

async function GetAllUsers(req, res){
    try {

        const connection = await mysql.createConnection(databaseConfig);

        const [users] = await connection.query('SELECT * FROM user');

        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).send(
            {
                message: 'Error getting users!',
                body: error.message,
            }
        )
        
    }
}

module.exports = {
    CreateUser,
    GetAllUsers,
}