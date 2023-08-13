import '../../../css/nav.css';
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';

type NavProps = {
    LoginState: boolean;
    onChangeLoginState: (state: boolean) => void;
    onChangeMode: (id: number) => void; // 예시로 빈 함수 타입 설정
};

function Nav(props: NavProps) {
    const [gnblis, setgnblis] = useState<JSX.Element[]>([]);
    const [LoginText, setLoginText] = useState<string>("Login");

    const show_hide_gnb = () => {
        const gnb: Element | null = document.querySelector('.gnbul');

        if (gnb?.classList.contains('show')) {
            gnb.classList.remove('show');
        } else {
            gnb?.classList.add('show');
        }
    }

    const show_lis = () => {
        const gnb_lis_save_list: JSX.Element[] = [];


        if (sessionStorage.getItem('userUID') !== null) {
            setLoginText("Logout");
        } else {
            setLoginText("Login");
        }
        const gnb_name: JSX.Element[] = [<i className="fa-solid fa-calendar-days"></i>, <i className="fa-solid fa-user"></i>, <i className="fa-solid fa-address-book"></i>];
        const gnb_path: string[] = ['/', 'SignIn_SignUp', 'Contect'];
        const gnb_className: string[] = ['NavCalendar','NavSignIn','NavContect'];

        for (let x = 0; x < gnb_name.length; x++) {
            if ((x === 1 && sessionStorage.getItem('userUID') === null) || x !== 1) {
                gnb_lis_save_list.push(
                    <li key={`gnb_name${x}`} className={gnb_className[x]}>
                        <NavLink to={gnb_path[x]}>{gnb_name[x]}</NavLink>
                    </li>
                )
            } else {
                gnb_lis_save_list.push(
                    <li key={`gnb_name${x}`} className="NavSignOut">
                        <a href='#' className='LogoutBtn' onClick={() => { Logout() }}><i className="fa-solid fa-user-slash"></i></a>
                    </li>
                )
            }
        }

        setgnblis(gnb_lis_save_list);
    }

    const Logout = () => {
        sessionStorage.removeItem('userUID');
        props.onChangeLoginState(false);
    }

    useEffect(() => {
        show_lis();
    }, [LoginText, props.LoginState])

    return (
        <div id='gnb_wrap' className='gnb_wrap'>
            <button className='show_gnb' onClick={() => { show_hide_gnb() }}><i className="fa-solid fa-bars"></i></button>
            <nav>
                <ul className='gnbul'>
                    {gnblis}
                </ul>
            </nav>
        </div>
    )
}

export default Nav;
