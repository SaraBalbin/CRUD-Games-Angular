
// Usar el promise permite las funciones asincronas y el await de las variables
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ng_games_db'
});

export default connection;