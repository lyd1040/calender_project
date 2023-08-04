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
        const gnb_name: string[] = ['Calendar', 'Login', 'Contect'];
        const gnb_path: string[] = ['/', 'SignIn_SignUp', 'Contect'];

        for (let x = 0; x < gnb_name.length; x++) {
            if ((gnb_name[x] === 'Login' && sessionStorage.getItem('userUID') === null) || gnb_name[x] !== 'Login') {
                gnb_lis_save_list.push(
                    <li key={`gnb_name${x}`}>
                        <NavLink to={gnb_path[x]}>{gnb_name[x]}</NavLink>
                    </li>
                )
            } else {
                gnb_lis_save_list.push(
                    <li key={`gnb_name${x}`}>
                        <a href='#' className='LogoutBtn' onClick={() => { Logout() }}>Logout</a>
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
