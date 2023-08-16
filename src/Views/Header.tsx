import Nav from '../Components/Header/Nav/Nav';
import '../css/header.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



type NavProps = {
  Mode: string;
  header_YMD: number[];
  LoginState: boolean;
  onChangeLoginState: (state: boolean) => void;
  onChangeMode: (id: number) => void; // 예시로 빈 함수 타입 설정
  onChangeMode2: (id: number, year: number, month: number, date: number) => void;
};


function Header(props: NavProps) {
  const [DateInputText, setDateInputText] = useState<string>('');
  const [updateState, setupdateState] = useState<boolean>(false);
  const [show_hide_date, set_show_hide_date] = useState<JSX.Element[]>([]); // 초기값을 빈 배열로 설정
  const [NavLinkTag, setNavLinkTag] = useState<JSX.Element>(<></>);

  //Year, Month, Date 설정하는 input 그리기
  const setting_input_value = () => {
    let Month: string = `${props.header_YMD[1]}`;
    let Date: string = `${props.header_YMD[2]}`;
    if (props.header_YMD[1] < 10) {
      Month = `0${props.header_YMD[1]}`;
    }
    if (props.header_YMD[2] < 10) {
      Date = `0${props.header_YMD[2]}`;
    }
    setDateInputText(`${props.header_YMD[0]}-${Month}-${Date}`);
  }

  //선택한 날짜 출력하는 곳 그리기
  const header_YMD_print = () => {
    const headerYMD_arr: JSX.Element[] = [<></>];
    let YMD_text: string = '';
    let YMD_className: string = '';
    if (props.Mode === 'READ') {
      if (updateState === false) {
        for (let x = 0; x < props.header_YMD.length; x++) {
          if (x === 0) { YMD_text = '년'; YMD_className = 'year' }
          else if (x === 1) { YMD_text = '월'; YMD_className = 'month' }
          else { YMD_text = '일'; YMD_className = 'date' }

          headerYMD_arr.push(
            <div className={`headerYMD${YMD_className}`} key={`headerYMD${x}${props.header_YMD[x]}`}>
              <a href="/" onClick={(event) => { event.preventDefault(); setupdateState(true); }}>{props.header_YMD[x]}{YMD_text}</a>
            </div>
          )
        }
      } else {
        if (DateInputText === '') {
          setting_input_value();
        }
        headerYMD_arr.push(
          <input className='settingYMDText' type='date' onChange={(event) => { setDateInputText(event.target.value) }} value={DateInputText}></input>,
          <button type='button' onClick={() => { setupdateState(false); onChangeMode2(); }}>확인</button>
        );
      }

    }

    set_show_hide_date(headerYMD_arr)
  }

  //Gnb Component 그리기
  const setting_navLinkTag = (): void => {
    setNavLinkTag(<Nav LoginState={props.LoginState} onChangeLoginState={props.onChangeLoginState} onChangeMode={props.onChangeMode}></Nav>)
  }


  //날짜 옮기기(App.tsx함수)
  const onChangeMode2 = () => {
    let DateEle: HTMLInputElement = document.querySelector('.settingYMDText') as HTMLInputElement;
    let YMDArr: string[] = DateEle.value.split('-');

    props.onChangeMode2(1, Number(YMDArr[0]), Number(YMDArr[1]), Number(YMDArr[2]))
  }

  useEffect(() => {
    setting_input_value();
  }, [props.header_YMD])

  //
  useEffect(() => {
    header_YMD_print();
  }, [props.header_YMD, updateState, DateInputText]);

  useEffect(() => {
    setting_navLinkTag();
  }, [props.LoginState]);
  return (
    <header>
      <h1 id='logo' className='logo'><Link to='/Calendar'>Event Calendar</Link></h1>
      <div className='headerYMD'>
        {show_hide_date}
      </div>
      {NavLinkTag}
    </header>
  )
}

export default Header;