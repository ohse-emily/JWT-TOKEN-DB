const crypto = require('crypto');

function createPW(userpw){
    const cryptoPassword = crypto.createHmac('sha256',Buffer.from(userpw).toString())
                            .digest('base64')
                            .replace('==','').replace('=','');                            

    return cryptoPassword;
}  

module.exports=createPW;