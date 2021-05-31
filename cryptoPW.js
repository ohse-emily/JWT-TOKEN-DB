// const crypto = require('crypto');

// function createPW(userpw){  //createHmac 두번째 인자값 = any String like salt 암호화필요  
//     const cryptoPassword = crypto.createHmac('sha256',Buffer.from(process.env.salt))
//                             .update('userpw')
//                             .digest('base64')
//                             .replace('==','').replace('=','');                            
//     return cryptoPassword;
// }  

// module.exports=createPW;




//JWT.js 로 합병