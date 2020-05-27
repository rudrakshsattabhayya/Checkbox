const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


mongoose.connect("mongodb://localhost:27017/trial",{useNewUrlParser: true,useUnifiedTopology: true});

const trialSchema= new mongoose.Schema({
  checked:String
});

const Trial=new mongoose.model("Trial",trialSchema);

app.get("/",function(req,res){
  Trial.find(function(err,trials){
    res.render("index",{value: trials});
  })

});

app.post("/checkbox",function(req,res){

  Trial.findOne({_id:req.body.checkbox},function(err,trials){
    console.log("before "+trials.checked);
    if(trials.checked=="false")
    Trial.updateOne({_id:req.body.checkbox},{checked:"true"},function(err){if(err)console.log(err);});
    else
    Trial.updateOne({_id:req.body.checkbox},{checked:"false"},function(err){if(err)console.log(err);});
        console.log("after "+trials.checked);
  })
  res.redirect("/");
})

app.listen(7000,function(){
  console.log("Trial Server started at port 7000");
})
