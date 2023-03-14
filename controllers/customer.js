const mysql2 = require('mysql2');

const Move = require('../models/move');
const session = require('express-session');
const multer = require('multer'); // a
const upload = multer(); // a
const path = require('path');
const fs = require('fs');

const crypto = require('crypto');

const sharp = require('sharp');


exports.GETlogin2 = (req,res,next) => {
    if(req.session.moveid == true){
        res.redirect('/mybol');
    }else{
        res.render('customer/login',{
            pageTitle: "View Bill of Ladding"
        });
    }
}


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

exports.viewBOL = (req,res,next) => {
    if(req.session.moveid == true){

        Move.findByPk(req.session.moveid).then(result => {
            if(result.signature1_datetime){
                if(result.signature2_datetime){
                                
                    const travel_total = result.travel_time * result.rate;
                    const labor_total = result.labor_time * result.rate;

                    const add_service_1_total = result.add_service_11 * result.add_service_111;
                    const add_service_2_total = result.add_service_22 * result.add_service_222;
                    const add_service_3_total = result.add_service_33 * result.add_service_333;
                    res.render('customer/bolfinal', {
                        result:result,
                        moveid: req.session.moveid,
                        labor_time: result.labor_time,
                        travel_total: travel_total,
                        labor_total: labor_total,
                        total_boolean: true,
                        packingmaterials: result.packingmaterials,
                        add_service_1_total: add_service_1_total,
                        add_service_2_total: add_service_2_total,
                        add_service_3_total: add_service_3_total,
                        subtotal: result.subtotal,
                        subtotalcc: result.subtotalcc,
                        merchantfee: result.merchantfee,
                        final_version: true,
                        signature_delivery: false
                    });
                }else{
                    return res.redirect('/signedBol');
                }
            }else{
                const now = new Date();
                const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
                console.log(formattedDate);
    
                res.render('customer/bol.ejs', {
                    result: result,
                    formattedDate:formattedDate,
                    moveid:req.session.moveid
                });
                console.log(result);

            }
        }).catch();
    }else{
        res.redirect('/login');
    }
}

exports.POSTsignature1 = (req,res,next) => {
    upload.none();

    const signature_hash = req.body.random_string;
    const signature = req.body.signature_input;
    const moveid = req.session.moveid;
    /*
    function generateRandomString(length) {
        const bytes = crypto.randomBytes(Math.ceil(length / 2));
        const hexString = bytes.toString('hex');
        return hexString.slice(0, length);
    }
    */


    // process the name and signature data here
    // ...
    // decode the signature data and save to file
    const data = signature.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(data, 'base64');
    const filename = `${signature_hash}_signature.png`;
    const filepath = path.join(__dirname, '../signatures', filename);
    fs.writeFileSync(filepath, buffer);

    // send response to client
    const start_time = req.body.start_time;
    console.log(start_time);

    const now = new Date();
    const options = { timeZone: 'America/Chicago' };
    const cstDate = new Date(now.toLocaleString('en-US', options));


    //aaa
    const today = new Date();
    const todayDate = today.toLocaleDateString("en-US", {timeZone: "America/Chicago"});

    Move.findByPk(req.session.moveid).then(result => {
        result.signature1_url = filename;
        result.signature1_hash = signature_hash;
        result.signature1_datetime = cstDate;
        result.start_time = start_time;
        result.start_date = todayDate;
        return result.save();
        }).then(() => {
            res.redirect('/signedbol');
      })
      .catch(err =>{
        console.log(err);
    }); 

} 


exports.GETsignedBol = (req,res,next) => {
    res.render('customer/signedbol');
}

exports.POSTbolDelivery = (req,res,next) => {

    if(req.session.moveid == true){


        Move.findByPk(req.session.moveid).then(result => {
                res.render('customer/boldelivery.ejs', {
                    result: result,
                    moveid:req.session.moveid,
                    total_boolean: false,
                    final_version: false,
                    signature_delivery: false
                });
                console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }
}


exports.POSTbolMaterials = (req,res,next) => {
    Move.findByPk(req.session.moveid).then(result => {
        if(req.body.cpb15>0) { result.cpb15 = req.body.cpb15; }
        if(req.body.cpb30>0){ result.cpb30 = req.body.cpb30; }
        if(req.body.cpb45>0){ result.cpb45 = req.body.cpb45; }
        if(req.body.cpb60>0) { result.cpb60 = req.body.cpb60; }
        if(req.body.cpmirror>0){ result.cpmirror = req.body.cpmirror; }
        if(req.body.cpdishpack>0){ result.cpdishpack = req.body.cpdishpack; }
        if(req.body.cpmattress>0){ result.cpmattress = req.body.cpmattress; }

        
        if(req.body.opb15>0) { result.opb15 = req.body.opb15; }
        if(req.body.opb30>0){ result.opb30 = req.body.opb30; }
        if(req.body.opb45>0){ result.opb45 = req.body.opb45; }
        if(req.body.opb60>0) { result.opb60 = req.body.opb60; }
        if(req.body.opmirror>0){ result.opmirror = req.body.opmirror; }
        if(req.body.opdishpack>0){ result.opdishpack = req.body.opdishpack; }
        if(req.body.opmattress>0){ result.opmattress = req.body.opmattress; }
        if(req.body.optape>0) { result.optape = req.body.optape; }
        if(req.body.opbubble>0){ result.opbubble = req.body.opbubble; }
        
        return result.save();
    }).then(result => {
        res.render('customer/boldelivery.ejs', {
            result: result,
            moveid:req.session.moveid,
            total_boolean: false,
            final_version: false,
            signature_delivery: false
        });
        console.log(result);
}).catch(err => {
    console.log(err);
})
}
/*

            const end_time = req.body.end_time;
            const today = new Date();
            const formattedDate3 = today.toLocaleDateString("en-US", {timeZone: "America/Chicago"});
            */

exports.POSTbolEndTime = (req,res,next) => {

    Move.findByPk(req.session.moveid).then(result => {
        const today = new Date();
        const todayDate = today.toLocaleDateString("en-US", {timeZone: "America/Chicago"});

        if(req.body.end_time){
            result.end_time = req.body.end_time;
            result.end_date = todayDate;
        }
        
        if(req.body.add_service_1 && req.body.add_service_11 && req.body.add_service_111){
            result.add_service_1 = req.body.add_service_1;
            result.add_service_11 = req.body.add_service_11;
            result.add_service_111 = req.body.add_service_111;
         }
         if(req.body.add_service_2 && req.body.add_service_22 && req.body.add_service_222){
            result.add_service_2 = req.body.add_service_2;
            result.add_service_22 = req.body.add_service_22;
            result.add_service_222 = req.body.add_service_222;
         }
         if(req.body.add_service_3 && req.body.add_service_33 && req.body.add_service_333){
            result.add_service_3 = req.body.add_service_3;
            result.add_service_33 = req.body.add_service_33;
            result.add_service_333 = req.body.add_service_333;
         }
           
        return result.save();
    }).then(result => {
        /* FORMA ZA LABOR TIME I TRAVEL TIME*/
        const date1 = new Date(`${result.start_date}T${result.start_time}Z`).toISOString();
        const date2 = new Date(`${result.end_date}T${result.end_time}Z`).toISOString();
        
        const start_datetime = new Date(date1);
        const end_datetime = new Date(date2);

        const diffInMs = Math.abs(end_datetime - start_datetime);
        const fifteenminutes = Math.ceil(diffInMs / 900000);

        let labor_time;
        if((fifteenminutes * 0.25) < 2){
            labor_time = 2;
        }else{
            labor_time = fifteenminutes * 0.25;
        }
        const labor_total = result.rate * labor_time;
        const travel_total = result.travel_time * result.rate;

        /* FORMA ZA MATERIALS */
        
        let packingmaterials = (result.cpb15 * 4.65) + (result.cpb30 * 6.25) + (result.cpb45 * 7.65 ) + (result.cpb60 * 8.45) + (result.cpmirror * 18.55) + (result.cpdishpack * 21.55) + (result.cpmattress * 24.00) + (result.opb15 * 1.65) + (result.opb30 * 3.00) + (result.opb45 * 4.65) + (result.opb60 * 6.25) + (result.opmirror * 10.65) + (result.opdishpack * 7.65) + (result.opmattress * 21.55) + (result.optape * 3.00) + (result.opbubble * 1.05);

        add_service_1_total = result.add_service_11 * result.add_service_111;
        add_service_2_total = result.add_service_22 * result.add_service_222;
        add_service_3_total = result.add_service_33 * result.add_service_333;

        let subtotal= labor_total + travel_total + add_service_1_total + add_service_2_total + add_service_3_total;
        let subtotalcc;
        let merchantfee = subtotal * 0.03;
        if(req.body.processingfee == "true"){
            subtotalcc = subtotal + merchantfee;
            merchantfee = parseFloat(merchantfee);
            merchantfee = merchantfee.toFixed(2);

        }else{
            subtotalcc = subtotal;
            merchantfee = 0;
        }
        
        subtotalcc = parseFloat(subtotalcc);
        subtotalcc = subtotalcc.toFixed(2);

        if(req.body.update_sign == "update_sign_clicked"){
            
            res.render('customer/boldelivery', {
                result: result,
                moveid: req.session.moveid,
                labor_time: labor_time,
                travel_total: travel_total,
                labor_total: labor_total,
                total_boolean: true,
                packingmaterials: packingmaterials,
                add_service_1_total: add_service_1_total,
                add_service_2_total: add_service_2_total,
                add_service_3_total: add_service_3_total,
                subtotal: subtotal,
                subtotalcc: subtotalcc,
                merchantfee: merchantfee,
                final_version: true,
                signature_delivery: true
            }) 
        }
            
        if(req.body.update == "update_clicked") {
            res.render('customer/boldelivery', {
                result: result,
                moveid: req.session.moveid,
                labor_time: labor_time,
                travel_total: travel_total,
                labor_total: labor_total,
                total_boolean: true,
                packingmaterials: packingmaterials,
                add_service_1_total: add_service_1_total,
                add_service_2_total: add_service_2_total,
                add_service_3_total: add_service_3_total,
                subtotal: subtotal,
                subtotalcc: subtotalcc,
                merchantfee: merchantfee,
                final_version: false,
                signature_delivery: false
            }) 

            
        result.packingmaterials = packingmaterials;
        result.labor_time = labor_time;
        result.subtotal = subtotal;
        result.subtotalcc = subtotalcc;
        result.merchantfee = merchantfee;
        return result.save();
        }

    }).catch(err => {
        console.log(err);
    });
}


exports.POSTsignature2 = (req,res,next) => {
    upload.none();

    const signature_hash = req.body.random_string;
    const signature = req.body.signature_input;
    const moveid = req.session.moveid;
    
    // decode the signature data and save to file
    const data = signature.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(data, 'base64');
    const filename = `${signature_hash}_signature.png`;
    const filepath = path.join(__dirname, '../signatures', filename);
    fs.writeFileSync(filepath, buffer);

    const now = new Date();
    const options = { timeZone: 'America/Chicago' };
    const cstDate = new Date(now.toLocaleString('en-US', options));

    Move.findByPk(moveid).then(result => {
        result.signature2_url = filename;
        result.signature2_hash = signature_hash;
        result.signature2_datetime = cstDate;
        return result.save();
    }).then(result => {
        const travel_total = result.travel_time * result.rate;
        const labor_total = result.labor_time * result.rate;

        const add_service_1_total = result.add_service_11 * result.add_service_111;
        const add_service_2_total = result.add_service_22 * result.add_service_222;
        const add_service_3_total = result.add_service_33 * result.add_service_333;

        res.render('customer/bolfinal', {
            result:result,
            moveid: req.session.moveid,
            labor_time: result.labor_time,
            travel_total: travel_total,
            labor_total: labor_total,
            total_boolean: true,
            packingmaterials: result.packingmaterials,
            add_service_1_total: add_service_1_total,
            add_service_2_total: add_service_2_total,
            add_service_3_total: add_service_3_total,
            subtotal: result.subtotal,
            subtotalcc: result.subtotalcc,
            merchantfee: result.merchantfee,
            final_version: true,
            signature_delivery: false
        });
    }).catch(err => {
        console.log(err);
    });

}