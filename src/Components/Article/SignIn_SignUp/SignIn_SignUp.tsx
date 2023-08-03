import React,{useState,useEffect} from "react";
import '../../../css/SignIn_SignUp.css'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import LoginPage_Calendar from './LoginPage_Calendar/LoginPage_Calendar'
import LoginPage_Clock from './LoginPage_Clock/LoginPage_Clock'

function SignIn_SignUp() {
    const [SignIn_SignUp_class,setSignIn_SignUp_class] = useState<string>('');

    const showSignUpFunction = (CHSG:string ):void =>{
        setSignIn_SignUp_class(CHSG);
    }
   
    return (
        <section id="SignIn_SignUp_wrap" className="SignIn_SignUp_wrap">
            <div id="SignIn_SignUp_date_time_card_wrap" className="SignIn_SignUp_date_time_card_wrap">
                <div id="date_time_3dcard" className="SignIn_SignUp_date_time_3dcard">
                    {/* 뒤집히는 애니메이션은  SignIn_SignUp.css에 있음*/}
                    <LoginPage_Clock />
                    <LoginPage_Calendar />
                </div>
                <div id="SignIn_SignUp_comp_wrap" className="SignIn_SignUp_comp_wrap">
                    <div id="Sign_show_hide" className={`Sign_show_hide ${SignIn_SignUp_class}`}>
                        <SignIn showSignUpFunction={showSignUpFunction} SignIn_SignUp_class={SignIn_SignUp_class}/>
                        <SignUp showSignUpFunction={showSignUpFunction} SignIn_SignUp_class={SignIn_SignUp_class}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn_SignUp;