const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
const { dir } = require("console");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const Email = req.body.email;
  // console.log(firstname, lastname, Email);

  const data = {
    members: [
      {
        email_address:Email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname

        }
      }
    ]
  };

  const jsonData=JSON.stringify(data);
  const url="https://us6.api.mailchimp.com/3.0/lists/76431d7e32";
  const options={
     method:"POST",
     auth:"shivakar1:e8b75da39fe1d385163b71c74da3502d-us6"
  };
  const request=https.request(url,options,function(response){
     
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname +"/failure.html");
    }

    response.on("data",function(data){
      // console.log(JSON.parse(data));
    })
  });
   request.write(jsonData);
   request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
  console.log("srever is running on port 3000");

});


//unique listid 76431d7e32
// api key e8b75da39fe1d385163b71c74da3502d-us6
           //e8b75da39fe1d385163b71c74da3502d-us6   ></button>  9da61b02-5f41-49d9-b942-9d55cbe85a29