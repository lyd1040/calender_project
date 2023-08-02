import Nav from '../Components/Header/Nav/Nav';
import '../css/header.css';
import React, { useState, useEffect } from 'react';



type NavProps = {
  Mode: string;
  header_YMD: number[];
  onChangeMode: (id: number) => void; // 예시로 빈 함수 타입 설정
};

//gnb 타입지정
function Header(props: NavProps) {

  const [show_hide_date, set_show_hide_date] = useState<JSX.Element[]>([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    set_show_hide_date(header_YMD_print());
  }, [props.header_YMD]);

  function header_YMD_print(): JSX.Element[] {
    const headerYMD_arr: JSX.Element[] = [<></>];
    let YMD_text: string = '';
    let YMD_className: string = '';
    for (let x = 0; x < props.header_YMD.length; x++) {
      if (x === 0) { YMD_text = '년'; YMD_className = 'year' }
      else if (x === 1) { YMD_text = '월'; YMD_className = 'month' }
      else { YMD_text = '일'; YMD_className = 'date' }

      if (props.Mode === 'READ') {
        headerYMD_arr.push(
          <li className={`headerYMD${YMD_className}`} key={`headerYMD${x}${props.header_YMD[x]}`}>
            <a href="/" onClick={(event) => { event.preventDefault(); }}>{props.header_YMD[x]}{YMD_text}</a>
          </li>
        )
      }
    }

    return headerYMD_arr
  }
  return (
    <header>
      <h1><a href={/read/ + '0'} onClick={event => { event.preventDefault(); props.onChangeMode(0) }}>Event Calender</a></h1>
      <ul className='headerYMD'>
        {show_hide_date}
      </ul>
      <Nav onChangeMode={props.onChangeMode}></Nav>
    </header>
  )
}

export default Header;