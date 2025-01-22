const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/', function (req, res) {
    
    res.send("hello world");
})

app.listen(PORT, ()=> {
    
    console.log("Server listening on PORT", PORT);
}); 