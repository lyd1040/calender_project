import React, { useState, useEffect } from "react";
import '../../../css/SignIn_SignUp.css'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import SearchIdPw from "./SearchIdPw/SearchIdPw";
import LoginPage_Calendar from './LoginPage_Calendar/LoginPage_Calendar'
import LoginPage_Loading from './LoginPage_Loading/LoginPage_Loading'

type SignIn_SignUpType = {
    onChangeLoginState: (state: boolean) => void;
}
function SignIn_SignUp(props: SignIn_SignUpType) {
    const [LoadingState, setLoadingState] = useState<boolean>(false);
    const [SignIn_SignUp_class, setSignIn_SignUp_class] = useState<string>('');

    const onchangeLoadingMode = (changeLoad: boolean) => {
        setLoadingState(changeLoad);
    }
    const showSignUpFunction = (CHSG: string): void => {
        setSignIn_SignUp_class(CHSG);
    }

    //Gnb 감추기
    const headerCheck = () => {
        const gnb: Element | null = document.querySelector('.gnbul');

        if (gnb) {
            gnb.classList.remove('show');
        }
    }
    useEffect(() => {
        headerCheck();
    }, [])

    useEffect(() => {
        let SignIn_SignUp_date_time_3dcard: HTMLDivElement = document.querySelector('.SignIn_SignUp_date_time_3dcard') as HTMLDivElement;
        if (LoadingState === true) {
            SignIn_SignUp_date_time_3dcard.classList.add('active');
        } else {
            SignIn_SignUp_date_time_3dcard.classList.remove('active');
        }
    }, [LoadingState])
    return (
        <section id="SignIn_SignUp_wrap" className="SignIn_SignUp_wrap">
            <div id="SignIn_SignUp_date_time_card_wrap" className="SignIn_SignUp_date_time_card_wrap">
                <div id="date_time_3dcard" className="SignIn_SignUp_date_time_3dcard">
                    {/* 뒤집히는 애니메이션은  SignIn_SignUp.css에 있음*/}
                    <LoginPage_Loading />
                    <LoginPage_Calendar />
                </div>

                <div id="SignIn_SignUp_comp_wrap" className="SignIn_SignUp_comp_wrap">
                    <div id="Sign_show_hide" className={`Sign_show_hide ${SignIn_SignUp_class}`}>
                        <SearchIdPw showSignUpFunction={showSignUpFunction} SignIn_SignUp_class={SignIn_SignUp_class}></SearchIdPw>
                        <SignIn onchangeLoadingMode={onchangeLoadingMode} onChangeLoginState={props.onChangeLoginState} showSignUpFunction={showSignUpFunction} SignIn_SignUp_class={SignIn_SignUp_class} />
                        <SignUp onchangeLoadingMode={onchangeLoadingMode} showSignUpFunction={showSignUpFunction} SignIn_SignUp_class={SignIn_SignUp_class} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn_SignUp;