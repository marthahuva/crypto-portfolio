//const express = require('expresss');
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.use(express.json());

//Conectando mysql
const pool =mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'n3u3da!',
    database:'crypto_portfolio'
})

const port = 3000;
app.get('/', async (req, res) => {
    try{
        const [rows, fields] = await pool.query('SELECT * FROM cryptocoin')
        res.json(rows);
    }catch(err){
        console.log(err);
    }
})

app.get('/portafolio', async (req, res) => {
    try{
        const {user} = req.query;
        const [rows, fields] = await pool.query('CALL Portafolio(?)', [user])
        res.json(rows[0]);
    }catch(err){
        console.log(err);
    }
})

app.post('/prueba', async(req, res) =>{
    try{
        const cryptoInfo = req.body;
        const newCryptoInfo = {...cryptoInfo}
        console.log(newCryptoInfo)
    
        const values = Object.values(newCryptoInfo)
        console.log(values)
        await pool.query('INSERT INTO cryptocoin (id_Coin, Symbol, Imagen) VALUES ?', [[values]])
        res.status(201).send('Added');
    }catch(err){
        res.status(400).send("ERROR!");
    }

})

app.put('/prueba/:id', async(req, res) =>{
    try{
        const { id } = req.params;
        const { symbol } = req.body;
        const [result] = await pool.query('UPDATE cryptocoin SET Symbol = ? WHERE ID_CryptoCoin = ?', [symbol ,id])
        console.log(result)
        if(result.affectedRows === 0){
            return res.status(404).send("Coin not found")
        }
        res.status(200).send("Updated successfully");
    }catch(err){
        res.status(500).send("Error updating")
    }

})
app.delete('/delete/:id', async(req, res) =>{
    try{
        const{id} = req.params;
        const[result] = await pool.query( "DELETE FROM cryptocoin WHERE ID_CryptoCoin = ?", [id])
        if(result.affectedRows === 0){
            return res.status(404).send("Coin not found")
        }
        res. status(200).send("Deleted successfully")
    }catch(err){
        res.status(500).send("Error deleting coin")
    } 
})

app.listen(port, () => {
    console.log(`Example app ${port}`)
})