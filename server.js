const express = require("express");
let  app = express();
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public'));
app.listen(3000,  () => console.log("Example app listening on port 3000!"));
