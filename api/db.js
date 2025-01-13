import pkg from 'pg';
const { Client } = pkg;

let client = new Client({
  user: 'postgres', 
  host: 'localhost', 
  database: 'blogpost', 
  password: 'postgres', 
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log("failed to connect! ",err);
  }else{
    console.log("connected to db successfully!");
  }
})
export default client;

