const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000;
const { Sequelize, DataTypes } = require("sequelize")
require("dotenv").config();

app.use(cors())
app.use(express.json())


// CONEXION A LA DB
const sequelize = new Sequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        retry: {
            max: 10
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }
);

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

sequelize.sync();

app.post('/api/users', async (req, res) => {
    const {firstName, lastName, age} = req.body;
    try {
        const user = await User.create({firstName, lastName, age});
        res.status(201).json(user);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 'Error creando usuario'})
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 'Error listando usuarios'})
    }
});

app.listen(PORT, () => {
    console.log('Servidor ejecutandose en el puerto', PORT)
})