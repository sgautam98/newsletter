const express=require("express");
const bodyparser=require("body-parser");
const request =require("request");
const app =express();
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
var data ={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME: firstname,
        LNAME: lastname
      }
    }
  ]
};

var jsonData= JSON.stringify(data);

  var options={
  url:"https://us4.api.mailchimp.com/3.0/lists/279c104243",
  method:"POST",
  headers:{
          "Authorization":"sushant 131617cafa920388cdf88920487a6c3b-us4"
          },
  body:jsonData
  }
  request(options,function(error ,response, body){
    if(error){
      res.send("There is an error with signing up, please try again");
    }else{
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
          res.sendFile(__dirname + "/failure.html");
        }

      }

  });


});
app.post("/failure",function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT|| 3000, function(){
  console.log("Server is running on port no. 3000");
});




// 131617cafa920388cdf88920487a6c3b-us4

// 279c104243
