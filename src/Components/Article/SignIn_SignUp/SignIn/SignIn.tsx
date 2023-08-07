import React, { useState, useEffect } from "react";
import '../../../../css/SignIn.css'
import { db, auth } from '../../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { useNavigate } from "react-router-dom";

type SignInType = {
    onchangeLoadingMode: (state: boolean) => void
    onChangeLoginState: (state: boolean) => void
    showSignUpFunction: (CHSG: string) => void;
    SignIn_SignUp_class: string;
}

function SignIn(props: SignInType) {
    const Navigate = useNavigate();
    let [notSelect, setNotSelect] = useState<string>('');

    const [Sign_inputTags, setSign_inputTags] = useState<JSX.Element[]>([<></>]);

    //화면에 input label 그리기
    const draw_SignInTag = () => {
        const SignTag: JSX.Element[] = [];
        const SignInlabelText: string[] = ['이메일', '비밀번호'];
        const SignInInputID: string[] = ['LoginIdInput', 'LoginPwInput'];
        const SignInInputype: string[] = ['text', 'password'];

        for (let x = 0; x < SignInlabelText.length; x++) {
            SignTag.push(
                <div key={`SignTagInputLabelWrap${x}`}>
                    <label htmlFor={SignInInputID[x]} className={`${SignInInputID[x]}label${x}`}>{SignInlabelText[x]}</label>
                    <input id={SignInInputID[x]} className={SignInInputID[x]}
                        key={`${SignInInputID[x]}inputTag${x}`}
                        onFocus={(event) => {
                            const SignInFocusTagLabel: HTMLElement = document.querySelector(`.${SignInInputID[x]}label${x}`) as HTMLElement;
                            SignInFocusTagLabel.classList.add('active');

                            event.target.addEventListener('focusout', () => {
                                if (event.target.value === '') {
                                    SignInFocusTagLabel.classList.remove('active');
                                }
                            })
                        }}
                        type={SignInInputype[x]} />
                </div>
            )
        }
        setSign_inputTags(SignTag);
    }

    const TryLogin = async () => {
        props.onchangeLoadingMode(true);
        const InputElementTags: HTMLInputElement[] = document.querySelectorAll('.SignIn form .Login_input_wrap input') as unknown as HTMLInputElement[];

        // 이메일과 비밀번호로 로그인을 시도합니다.
        try {// 로그인에 성공한 경우 원하는 동작을 수행합니다.
            await signInWithEmailAndPassword(auth, InputElementTags[0].value, InputElementTags[1].value);
            const user = auth.currentUser;
            if (user) {
                const dataRef = ref(db, user.uid);
                get(dataRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            return true;
                        } else {
                            set(dataRef, "");
                            return true;
                        }
                    })
                    .then((data: boolean) => {
                        if (data === true) {
                            sessionStorage.setItem('userUID', user.uid);
                            props.onChangeLoginState(true);
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .then((data: boolean) => {
                        if (data === true) {
                            GoMainPage('/');
                        }
                    })

                    .catch((error: any) => {
                        props.onchangeLoadingMode(false);
                        console.log(error);
                    })
            }
        } catch (error: any) {
            props.onchangeLoadingMode(false);
            window.alert('이메일이나 비밀번호가 다릅니다.');
            console.error('로그인 실패:', error.message);
            // 로그인에 실패한 경우 오류 처리를 수행합니다.
        }
    }

    //로그인시 메인페이지 이동
    const GoMainPage = (path: string) => {
        Navigate(path);
    }


    //Tab 막기
    const visibility = () => {
        if (props.SignIn_SignUp_class === '') {
            setNotSelect('');
        } else {
            setTimeout(() => {
                setNotSelect('VSB');
            }, 500);
        }
    }

    //마운트 최초실행
    useEffect(() => {
        draw_SignInTag();
    }, [])

    //업데이트
    useEffect(() => {
        visibility();
    }, [props.SignIn_SignUp_class])
    return (
        <div id="SignIn" className={`SignIn ${notSelect}`}>
            <div id="SignIn_contents_wrap" className="SignIn_contents_wrap">
                <h2>로그인</h2>
                <form action="" method="post" name="">
                    <div id="Login_input_wrap" className="Login_input_wrap">
                        {Sign_inputTags}
                    </div>

                    <button type="button" className="LoginBtn" id="LoginBtn" onClick={() => { TryLogin(); }}>Login</button>
                </form>
                <div id="LoginBtn_wrap" className="LoginBtn_wrap">
                    <a href="" onClick={(event) => { event.preventDefault(); props.showSignUpFunction('searchIdPw') }}>아이디/비밀번호 찾기</a>
                    <a href="" onClick={(event) => { event.preventDefault(); props.showSignUpFunction('signup') }}>회원가입</a>
                </div>
            </div>
        </div>
    )
}

export default SignIn;