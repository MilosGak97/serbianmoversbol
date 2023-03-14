const Move = require('../models/move');

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
    console.log(email);
    console.log(passcode);
    console.log("Outside move.findall.then");
    Move.findAll({
        where: {
            email: email,
            passcode: passcode
        }
    }).then(results => {
        console.log("Inside move.findall.then");
        /*
        if(results.length > 0){
        const result = results[0];
        console.log(result);
        req.session.moveid = result.id; 
        res.redirect(`/mybol`);
        }else{
            res.redirect("/login");
        }
        */
    }).catch( err =>    {
        console.log(err);
    })

}