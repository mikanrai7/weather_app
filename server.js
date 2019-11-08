let express = require('express');
let app = express();

app.use('/', (req, res)=>{
    res.sendFile(__dirname + '/src/index.html');
})
app.listen(8090);
console.log('App is Running');