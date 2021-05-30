require('dotenv').config();
const crypto = require('crypto');
const tokenKey=require('../JWT');

module.exports=(req,res,next)=>{

    let login_userid = req.session.userid;
    let [header,payLoad, signature] = tokenKey(login_userid).split('.');
    let signatureToCheck = signatureCheck(header,payLoad); //질문 1. 인자값 꼭 존재? 2. Fn없이는?

    function signatureCheck(){
        const signatureChecked = crypto.createHmac('sha256',Buffer.from(process.env.salt))
                                .update(`${header}.${payLoad}`)
                                .digest('base64').replace('==','').replace('=','');
        return signatureChecked 
    }

    if(signature==signatureToCheck){
        console.log('검증완료');
        let {userid,exp}=JSON.parse(Buffer.from(payLoad,'base64').toString());
        let now = new Date().getTime();
        if(now>exp){
            console.log('토큰만료');
            redirect('/msg=토큰만료');
            return 0; 
        }
        req.userid=userid;
        next();
    }else{
        console.log('검증실패');
        res.redirect('/msg=해킹이요');
    }
}