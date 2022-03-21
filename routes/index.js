var express = require('express');
var router = express.Router();
var fs = require("fs")
var files


/* GET home page. */
router.get('/', function(req, res) {
  fs.readdir("./files",function(err,files){
    if(err) res.send(err)
    else res.render("index",{files,data:"",plc:""})
  })
});
router.post("/save/:plc",function(req,res){
  fs.writeFile(`./files/${req.params.plc}`,req.body.textbox,function(err){
    if(err) res.send(err) 
    else{
      res.redirect(`/open/${req.params.plc}`)
    }
  })
})

router.get("/delete/:naam",function(req,res){
  fs.unlink(`./files/${req.params.naam}`,function(err){
    if(err) res.send(err)
    else res.redirect('/')    
  })
})
router.get("/open/:plc",function(req,res){
    fs.readFile(`./files/${req.params.plc}`,"utf-8",function(err,data){
    if(err) res.send(err)
    else {
       fs.readdir("./files","utf8",function(err,files){
        if(err) res.send(err)
        else{
          
          res.render("index",{files,data,plc:req.params.plc})
        }
       }) 
    }
  })
})
router.get("/createFile",function(req,res){
  fs.writeFile(`files/${req.query.filename}`,"",function(err){
    if(err) res.send(err)
    else res.redirect('/')
  })
})
module.exports = router;
