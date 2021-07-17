const express = require('express');
const bodyParser = require('body-parser');
var mongoSanitize = require("express-mongo-sanitize");
var cors = require('cors')

//const mongoose=require("mongoose");
//var router = express.Router();
require('dotenv').config();
var config = require("./config");
const app = express();
const axios = require('axios').default;
var validate = require('ip-validator');


app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(mongoSanitize());
const PromisePool = require('@supercharge/promise-pool')

var links = require('./models/links') //importing our link model
//for inserting links in the url
app.post("/insertLink", async function (req, res, err) {
    try {
        const { link, usrid } = req.body;

        if (link.length > 0 && usrid.length > 0) {
            var a = await links.find(usrid);
            if (a.length == 0) {

                var newlink = new links({
                    link: link,
                    usrid: uid
                });
                await newlink.save();
                res.json({
                    Message: newlink,
                    Data: 0,
                    IsSuccess: true
                });
            }
            else {

                res.json({
                    Message: "usrid already exists",
                    Data: 0,
                    IsSuccess: true
                });
            }

        } else {
            res.json({
                Message: "link or userid is empty!",
                Data: 0,
                IsSuccess: true
            });
        }
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false
        });
    }
});


//for updating list
app.post("/updateLink", async function (req, res, err) {
    try {
        const { link, usrid } = req.body;

        if (link.length > 0 && usrid.length > 0) {
            var a = await links.find(usrid);
            if (a.length == 0) {
                res.json({
                    Message: "usrid does not exists",
                    Data: 0,
                    IsSuccess: true
                });


            }
            else {
                var newlink = await links.findOneAndUpdate({ userid: usrid }, { link: (link) }, { new: true });
                res.json({
                    Message: newlink,
                    Data: 0,
                    IsSuccess: true
                });
            }

        } else {
            res.json({
                Message: "link or userid is empty!",
                Data: 0,
                IsSuccess: true
            });
        }
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false
        });
    }
});



//for deleting the link
app.post("/deleteLink", async function (req, res, err) {
    try {
        const { link, usrid } = req.body;

        if (link.length > 0 && usrid.length > 0) {
            var a = await links.find(usrid);
            if (a.length == 0) {
                res.json({
                    Message: "usrid does not exists",
                    Data: 0,
                    IsSuccess: true
                });


            }
            else {
                var newlink = await links.findOneAndDelete({ userid: usrid });
                res.json({
                    Message: "link is deleted",
                    Data: 0,
                    IsSuccess: true
                });
            }

        } else {
            res.json({
                Message: "link or userid is empty!",
                Data: 0,
                IsSuccess: true
            });
        }
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false
        });
    }
});


//for action provide link for eg. http://localhost:3000/action?ip=12.43.23.43
app.get("/action", async function (req, res, err) {
    try {
        var ip = req.query.ip;
        if (validateipv4(ip) || validateipv6(ip)) {
            var data = await links.find();
            console.log(data.length)
            var x = length / 30;

            const { results, errors } = await PromisePool //here I have done for 5 times my embedding my code four my times so that if it fails one time it will try four more times
                .for(data)
                .withConcurrency(x)
                .process(async dat => {

                     axios({
                        method: 'post',
                        url: `${dat.link}`,
                        data: {
                            ipaddress: ip,
                            date: Date.now()
                        }
                    }).then(function(response){
                         if(!response.status(202)){
                            axios({
                                method: 'post',
                                url: `${dat.link}`,
                                data: {
                                    ipaddress: ip,
                                    date: Date.now()
                                }
                            }).then(function(response){
                                 if(!response.status(202)){
                                    axios({
                                        method: 'post',
                                        url: `${dat.link}`,
                                        data: {
                                            ipaddress: ip,
                                            date: Date.now()
                                        }
                                    }).then(function(response){
                                         if(!response.status(202)){
                                            axios({
                                                method: 'post',
                                                url: `${dat.link}`,
                                                data: {
                                                    ipaddress: ip,
                                                    date: Date.now()
                                                }
                                            }).then(function(response){
                                                 if(!response.status(202)){
                                                
                                                 }
                                            });
                        
                                         }
                                    });
                
                                 }
                            });
        
                         }
                    });

                    return 
                })






        } else {
            res.json({
                Message: "ip address correct format is not provided ",
                Data: 0,
                IsSuccess: true
            });
        }
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false
        });
    }
});





app.listen(3000, () => {
    console.log('app is running on port 3000');
})