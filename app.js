const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req,res){
const query = req.body.cityName;
const apiKey = "4805a0541d852f1a5c3ffe649f915b39";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/find?q="+query+"&appid="+ apiKey + "&units=" + unit

https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.list[0].main.temp ;
    const weatherDescription = weatherData.list[0].weather[0].description;
    const icon = weatherData.list[0].weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<p>The weather is currently " + weatherDescription + "<p>");
    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
    res.write("<img src="+ imageURL + ">");
    res.send();
  });
});

})





app.listen(3000,function(){
  console.log("Server is running on Port 3000!");
});
