const mysql2 = require('mysql2');

const Move = require('../models/move');
const session = require('express-session');
const multer = require('multer'); // a
const upload = multer(); // a
const path = require('path');
const fs = require('fs');

const crypto = require('crypto');

const sharp = require('sharp');


exports.GETlogin = (req,res,next) => {
    if(req.session.moveid == true){
        res.redirect('/mybol');
    }else{
        res.render('customer/login',{
            pageTitle: "View Bill of Ladding"
        });
    }
}

exports.POSTlogin = (req,res,next) => {
    const email = req.body.email;
    const passcode = req.body.passcode;

    Move.findAll({
        where: {
            email: email,
            passcode: passcode
        }
    }).then(results => {
        if(results.length > 0){
        const result = results[0];
        req.session.moveid = result.id;
        res.redirect(`/mybol`);
        }else{
            res.redirect("/login");
        }
    }).catch( err =>    {
        console.log(err);
    })

}