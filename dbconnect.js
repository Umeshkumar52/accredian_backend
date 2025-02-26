import mysql from 'mysql2'
    const connection=await mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"munesh52@pratap",
    database:"referals"
})
export default connection
