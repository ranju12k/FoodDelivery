const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");

// Call mongoDB function to connect to MongoDB
mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use express.json() instead of express.json
app.use(express.json());

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData")); // Use correct case
app.use('/api', require("./Routes/OrderData")); 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
