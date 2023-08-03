import React, { useState, useEffect } from "react";
import '../../../../css/SignUp.css'
import { createUserWithEmailAndPassword, sendEmailVerification, Auth, UserCredential, User } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { db } from '../../../../firebase'
import { ref, get, set } from 'firebase/database';

type FunctionType = () => void;

function SignUp() {

    //input 태그 그리기
    const [SignUpTags, setSignUpTags] = useState<JSX.Element[]>([])
    const SignupTags_draw = async (): Promise<void> => {
        let label_name: string[] = ['이메일', '비밀번호', '비밀번호 확인', '이름', '생년월일'];
        let label_input_link: string[] = ['SignUpuserID', 'SignUpuserPW', 'SignUpuserPWCheck', 'SignUpusername', 'SignUpuserbirth'];
        let inputTags_type: string[] = ['email', 'password', 'password', 'text', 'text'];
        let validationfilter: (null | FunctionType)[] = [emailValidation, passwordValidation, checkPwValidation, null, null];
        let Tags_draw: JSX.Element[] = [];
        for (let x = 0; x < label_name.length; x++) {
            Tags_draw.push(
                <div key={`SignUpFormTagsDraw` + x}>
                    <label htmlFor={label_input_link[x]} className={label_input_link[x] + x + 'label'}>{label_name[x]}</label>
                    <input type={inputTags_type[x]} id={label_input_link[x]} className={label_input_link[x]} required
                        onFocus={(event) => {
                            let SelectLabel: HTMLElement = document.querySelector(`.${label_input_link[x] + x}label`) as HTMLElement;
                            SelectLabel.classList.add('active');

                            event.target.addEventListener('focusout', () => {
                                if (event.target.value === '') {
                                    SelectLabel.classList.remove('active');
                                }
                            })
                        }}
                        onKeyUp={() => {
                            if (validationfilter[x] !== null) { validationfilter[x]?.(); }
                        }}
                    />
                </div>
            )
        }
        setSignUpTags(Tags_draw);
    }

    //button 태그 그리기
    const [SignUpbtnTags, setSignUpbtnTags] = useState<JSX.Element[]>([])
    const SignUpBtnTags_draw = async (): Promise<void> => {
        let BtnName: string[] = ['이전', '회원가입']
        let BtnFunction: FunctionType[] = [showSignIn, AllValidation]
        let BtnTags_draw: JSX.Element[] = [];
        for (let x = 0; x < BtnName.length; x++) {
            BtnTags_draw.push(
                <button type="button" key={`SignUpbtnTags` + x} onClick={() => { BtnFunction[x]() }}>{BtnName[x]}</button>
            )
        }
        setSignUpbtnTags(BtnTags_draw);
    }

    //이메일 입력시
    let [EmailText, setEmailText] = useState<string>('');
    const emailValidation = (): void | boolean => {
        let SignUpuserID: HTMLInputElement = document.querySelector('.SignUpuserID') as HTMLInputElement
        const emailValidation: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

        if (SignUpuserID) {
            setEmailText(SignUpuserID.value);
            if (emailValidation.test(SignUpuserID.value)) {
                //이메일 성공
                return true;
            } else { return false; }
        }
    }

    //비밀번호 입력시
    let [PassWordText, setPassWordText] = useState<string>('');
    const passwordValidation = (): void | boolean => {
        let SignUpuserPW: HTMLInputElement = document.querySelector('.SignUpuserPW') as HTMLInputElement;
        var PasswordValidation: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@!#$%^&*])[A-Za-z\d@!#$%^&*]{8,15}$/;

        if (SignUpuserPW) {
            setPassWordText(SignUpuserPW.value);
            if (PasswordValidation.test(SignUpuserPW.value)) {
                //비밀번호 성공
                return true;
            } else { return false; }
        }
    }

    //비밀번호 확인 입력시
    let [CheckPassWordText, setCheckPassWordText] = useState<string>('');
    const checkPwValidation = (): void | Boolean => {
        let SignUpuserPW: HTMLInputElement = document.querySelector('.SignUpuserPW') as HTMLInputElement;
        let SignUpuserPWCheck: HTMLInputElement = document.querySelector('.SignUpuserPWCheck') as HTMLInputElement

        if (SignUpuserPW && SignUpuserPWCheck) {
            setCheckPassWordText(SignUpuserPWCheck.value);
            if (SignUpuserPW.value === SignUpuserPWCheck.value) {
                return true;
            } else { return false; }
        }
    }

    //이름 유효성 검사
    let [UserNameText, setUserNameText] = useState<string>('');
    const checkUserName = (): void | Boolean => {
        let SignUpusername: HTMLInputElement = document.querySelector('.SignUpusername') as HTMLInputElement;
        const nameValidation: RegExp = /^[가-힣]{2,10}$/;
        if (SignUpusername) {
            setUserNameText(SignUpusername.value);
            if (nameValidation.test(SignUpusername.value)) {
                return true;
            } else {
                return false;
            }
        }
    }

    //생일 유효성 검사
    let [UserBirthDayText, setUserBirthDayText] = useState<string>('');
    const birthdayValidation = (): void | Boolean => {
        const SignUpuserbirth: HTMLInputElement = document.querySelector('.SignUpuserbirth') as HTMLInputElement
        const BirthDayCheck: RegExp = /^\d{8}$/;


        if (SignUpuserbirth) {
            setUserBirthDayText(SignUpuserbirth.value);
            if (BirthDayCheck.test(SignUpuserbirth.value)) {

                // 생년, 월, 일 추출
                const birthDayYear: number = parseInt(SignUpuserbirth.value.slice(0, 4), 10);
                const birthDayMonth: number = parseInt(SignUpuserbirth.value.slice(4, 6), 10);
                const birthDayDay: number = parseInt(SignUpuserbirth.value.slice(6, 8), 10);

                // 생년, 월, 일의 범위 확인
                const currentYear: number = new Date().getFullYear();
                const Date31: RegExp = /(1|3|5|7|8|10|12)/;
                const Date30: RegExp = /(4|6|9|11)/;

                if (birthDayYear < 1900 || birthDayDay > currentYear) {
                    return false;
                } else if (birthDayMonth < 1 || birthDayMonth > 12) {
                    return false;
                } else if (birthDayMonth === 2) {
                    //윤년 확인
                    if (birthDayYear % 4 !== 0 && (birthDayDay < 1 || birthDayDay > 28)) {
                        return false;
                    } else if (birthDayYear % 4 === 0 && (birthDayDay < 1 || birthDayDay > 29)) {
                        return false;
                    }
                } else if (Date31.test(birthDayMonth.toString()) && (birthDayDay < 1 || birthDayDay > 31)) {
                    return false
                } else if (Date30.test(birthDayMonth.toString()) && (birthDayDay < 1 || birthDayDay > 30)) {
                    return false
                } else {
                    return true;
                }
            }
            else {
                return false
            }
        }


    }

    //회원가입 클릭시
    const AllValidation = async (): Promise<void | boolean> => {
        let SignUpuserID: HTMLInputElement = document.querySelector('.SignUpuserID') as HTMLInputElement
        let SignUpuserPW: HTMLInputElement = document.querySelector('.SignUpuserPW') as HTMLInputElement
        let SignUpuserPWCheck: HTMLInputElement = document.querySelector('.SignUpuserPWCheck') as HTMLInputElement
        let SignUpusername: HTMLInputElement = document.querySelector('.SignUpusername') as HTMLInputElement
        let SignUpuserbirth: HTMLInputElement = document.querySelector('.SignUpuserbirth') as HTMLInputElement


        if (SignUpuserID && SignUpuserPW && SignUpuserPWCheck && SignUpusername && SignUpuserbirth) {
            if (emailValidation() === false) {
                console.log('emailValidation')
                return false;
            }
            if (passwordValidation() === false) {
                console.log('passwordValidation')
                return false;
            }
            if (checkPwValidation() === false) {
                console.log('checkPwValidation')
                return false;
            }
            if (checkUserName() === false) {
                console.log('checkUserName')
                return false;
            }
            if (birthdayValidation() === false) {
                console.log('birthdayValidation')
                return false;
            }
            console.log('success');

            try {
                await createUserWithEmailAndPassword(auth, SignUpuserID.value, SignUpuserPW.value);

                // 사용자가 인증되어 있는지 확인 후 이메일 검증을 보냅니다.
                const user: User | null = auth.currentUser;
                if (user) {
                    await sendEmailVerification(user);
                    alert('이메일 인증메일을 보냈습니다.');
                } else {
                    // 사용자가 인증되어 있지 않은 경우 처리
                    console.error('사용자가 인증되어 있지 않습니다.');
                }
            } catch (error: any) {
                console.error('회원가입 도중 오류 발생:', error.message);
            }

        }
    }

    //이전버튼 클릭시
    const showSignIn = (): void => {
        console.log('showSignIn')
    }

    const RootFunction = async () => {
        await SignupTags_draw();
        await SignUpBtnTags_draw();
    }
    //마운트시 실행
    useEffect(() => {
        RootFunction()
    }, [EmailText])

    return (
        <div id="SignUp" className="SignUp">
            <h2>회원가입</h2>
            <form action="" method="post" name="">
                <div>
                    {SignUpTags}
                    <p className="erroralram"></p>
                    <div id="SignUpBtnWrap" className="SignUpBtnWrap">
                        {SignUpbtnTags}
                    </div>

                </div>
            </form>

        </div>
    )
}

export default SignUp;