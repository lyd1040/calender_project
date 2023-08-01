import '../../../css/nav.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

type NavProps = {
    onChangeMode: (id: number) => void; // 예시로 빈 함수 타입 설정
};

function Nav(props: NavProps) {

    const show_hide_gnb = () =>{
        const gnb:Element | null = document.querySelector('.gnbul');

        console.log()

        if(gnb?.classList.contains('show')){
            gnb.classList.remove('show');
        }else{
            gnb?.classList.add('show');
        }
    }
    return (
        <div id='gnb_wrap' className='gnb_wrap'>
            <button className='show_gnb' onClick={()=>{show_hide_gnb()}}><i className="fa-solid fa-bars"></i></button>
            <nav>
                <ul className='gnbul'>
                    <li>Calendar</li>
                    <li>Login</li>
                    <li>Contect</li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;
