document.addEventListener('DOMContentLoaded', init)
function init(){
    const loginBtn = document.querySelector('#loginBtn');
    loginBtn.addEventListener('click', loginFn);
    const localLogin=document.querySelector('#localLogin');
    localLogin.addEventListener('click',localLoginFn);
}

function loginFn(){
    let layerPopup = document.querySelector('.layerPopup');
    layerPopup.classList.add('open');
    layerPopup.addEventListener('click',layerPopupFn);
}

function layerPopupFn(event){
    let layerPopup =document.querySelector('.layerPopup');
    if(event.target == this){
        layerPopup.classList.remove('open') 
    }
}

async function localLoginFn(){
    let userid = document.querySelector('#userid');
    let userpw = document.querySelector('#userpw');

    if(userid==''){ alert('아이디를 입력해주세요'); userid.focus(); return 0;};
    if(userpw==''){ alert('비밀번호를 입력해주세요'); userpw.focus(); return0;};

    let url = `http://localhost:3000/auth/local/login`;
    let options = {
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({
            userid:userid.value,
            userpw:userpw.value,
        })
    }

    let response = await fetch (url,options);
    let res_result = await response.json();
    let {result,msg} = res_result;
    alert(msg);

    if(result){
        let layerPopup=document.querySelector('.layerPopup');
        layerPopup.classList.remove('open');
        //req.session.userid=userid; 질문 왜 여기는 안되징(server.js가능)

    }else{
        userid.value='', 
        userpw.value='',
        userid.focus();
    }
}