import React from "react";
import '../../../../css/SignIn.css'

function SignIn() {


    return (
        <div id="SignIn" className="SignIn">
            <div id="SignIn_contents_wrap" className="SignIn_contents_wrap">
            <h2>로그인</h2>
            <form action="" method="post" name="">
                <div id="Login_input_wrap" className="Login_input_wrap">
                    <div><label htmlFor="LoginEmailID">이메일</label><input id="LoginIdInput" className="LoginIdInput" type="text"/></div>
                    <div><label htmlFor="LoginEmailPW">비밀번호</label><input id="LoginPwInput" className="LoginPwInput" type="text"/></div>
                </div>
            </form>
            <div id="LoginBtn_wrap" className="LoginBtn_wrap">
                <a href="" onClick={(event)=>{event.preventDefault();}}>아이디/비밀번호 찾기</a>
                <a href="" onClick={(event)=>{event.preventDefault();}}>회원가입</a>
            </div>
            </div>
        </div>
    )
}

export default SignIn;