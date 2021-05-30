const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const tokenKey = require('./JWT');
const cryptoPW=require('./cryptoPW')
const auth = require('./middleware/auth');
const mysql = require('mysql') 
const session=require('express-session');
const app = express();

nunjucks.configure('views', {
    express: app,
})
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, }))
app.use(express.static('public'));
app.use(session({
    secret:'aa',
    resave:true,
    secure:false,
    saveUninitialized:false,
}))

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5353',
    database: 'user0530'
})
connection.connect();

app.get('/', (req, res) => {
    res.render('index.html');
})

app.get('/user/join', (req, res) => {
    res.render('join.html');
})

app.post('/user/join_success', (req, res) => {
    let { userid, userpw, username } = req.body;
    let cryptoUserpw = cryptoPW(userpw);
    //db에 넣기 
    let sql = `insert into user (userid,userpw,username) values ('${userid}', '${cryptoUserpw}','${username}')`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            console.log(results);
        }
    });
    res.redirect('/');
})

app.post('/auth/local/login', (req, res) => {
    let { userid, userpw } = req.body;
    let result = {
        result: false,
        msg: '아이디와 비밀번호를 확인해주세요.'
    };
    
    let sql = `select * from user where userid='${userid}'`;
    connection.query(sql, (error, results) => {
        if (error || results=='') {
            console.log(error);
        } else {
            let DB_userid = results[0].userid; // db
            let DB_userpw = results[0].userpw; // db
            let cryptoUserpw = cryptoPW(userpw); //고객이 입력한pw 암호화
            if (userid == DB_userid && cryptoUserpw == DB_userpw) {
                let token = tokenKey(userid);
                res.cookie('accessToken', token, { httpOnly: true, secure: true, });
                result = {
                    result: true,
                    msg: '로그인 성공'
                }
            }
        }
        req.session.userid = userid;
        res.json(result)
    })
})

app.get('/user/info', auth, (req, res) => {
    let userid = req.userid;
    res.send(`${userid}님의 회원정보는 아래와 같습니다.`)
})

app.listen(3000, () => {
    console.log('server start port:3000')
})