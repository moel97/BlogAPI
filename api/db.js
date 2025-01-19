import pkg from 'pg';
const { Client } = pkg;
let client = new Client({
  user: process.env.DB_user, 
  host: process.env.DB_host, 
  database: process.env.DB_database, 
  password: process.env.DB_password, 
  port: process.env.DB_port,
  ssl: {
    rejectUnauthorized: false // This is often required for self-signed certificates
    }

});

client.connect((err) => {
  if (err) {
    console.log("failed to connect! ",err);
  }else{
    console.log("connected to db successfully!");
  }
})
export default client;

