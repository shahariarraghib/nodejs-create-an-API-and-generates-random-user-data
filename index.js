const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');

// routes path
const CrudOperationsRoute = require('./Routes/v1-Routes/CrudOperationsRoute');
const { getAllDataRandom } = require('./Controllers/GetDataRandom');

// thard party middleWare
app.use(cors());
app.use(express.json());


app.use("/api/v1/user", CrudOperationsRoute );
app.use("/api/v1/user/random", getAllDataRandom );


app.get('/', (req, res) => {
  res.send('server run successfully')
})

app.all("*", (req, res) => {
    res.send("no route found");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})