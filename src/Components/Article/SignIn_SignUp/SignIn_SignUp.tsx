import React from "react";
import '../../../css/SignIn_SignUp.css'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import LoginPage_Calendar from './LoginPage_Calendar/LoginPage_Calendar'
import LoginPage_Clock from './LoginPage_Clock/LoginPage_Clock'

function SignIn_SignUp() {
    return (
        <section id="SignIn_SignUp_wrap" className="SignIn_SignUp_wrap">
            <div id="SignIn_SignUp_date_time_card_wrap" className="SignIn_SignUp_date_time_card_wrap">
                <div id="date_time_3dcard" className="SignIn_SignUp_date_time_3dcard">
                    <LoginPage_Clock />
                    <LoginPage_Calendar />
                </div>
                <div id="SignIn_SignUp_comp_wrap" className="SignIn_SignUp_comp_wrap">
                    <div id="Sign_show_hide" className="Sign_show_hide">
                        <SignIn />
                        <SignUp />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn_SignUp;