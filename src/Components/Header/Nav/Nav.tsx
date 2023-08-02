import '../../../css/nav.css';
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';

type NavProps = {
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
            gnb_lis_save_list.push(
                <li key={`gnb_name${x}`}>
                    <NavLink to={gnb_path[x]}>{gnb_name[x]}</NavLink>
                </li>
            )
        }

        setgnblis(gnb_lis_save_list);
    }

    useEffect(() => {
        show_lis();
    }, [LoginText])
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
