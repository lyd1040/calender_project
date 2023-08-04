import React, { useState, useEffect } from "react";
import '../../../../css/SearchIdPw.css'

type SearchIdPwType = {
    SignIn_SignUp_class: string;
}

function SearchIdPw(props: SearchIdPwType) {

    let [notSelect, setNotSelect] = useState<string>('');
    //회원가입누를시 Tab 막기
    const visibility = () => {
        if (props.SignIn_SignUp_class === '') {
            setNotSelect('');
        } else {
            setTimeout(() => {
                setNotSelect('VSB');
            }, 500);
        }
    }

    //업데이트
    useEffect(() => {
        visibility();
    }, [props.SignIn_SignUp_class])

    return (
        <div id="SearchIdPw" className={`SearchIdPw ${notSelect}`}>
            fsdsfasfda
        </div>
    )
}

export default SearchIdPw;