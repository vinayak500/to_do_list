const express = require('express');
const port = 8000;

const app = express();


app.listen( port , function(err)
{
    if(err)
    {
        console.log("error" , err);
        return;
    }
      console.log("server is running in port " + port);
});