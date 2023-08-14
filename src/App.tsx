import React, { useEffect, useState } from 'react';
import Header from './Views/Header';
import Article from './Views/Article';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const [LoginState, setLoginState] = useState<boolean>(false);  //false ="로그인 해야됨" , true="로그인 되어있음"
  const [header_YMD, set_header_YMD] = useState<number[]>([
    NaN, //year
    NaN, //month
    NaN //date
  ])
  const [mode, setMode] = useState<string>('WELCOME');
  const [HeaderElement, setHeaderElement] = useState<JSX.Element>();
  const [FooterElement, setFooterElement] = useState<JSX.Element>();

  //모드 바꾸기
  const onChangeMode = (data: number, year?: number, month?: number, date?: number): void => {
    if (data === 0) {
      setMode('WELCOME');
    } else {
      setMode('READ');

      if (year !== undefined && month !== undefined && date !== undefined) {
        set_header_YMD([year, month, date]);
      } else {
        set_header_YMD([]);
      }
    }
  }

  const onChangeLoginState = (state: boolean): void => {
    setLoginState(state);
  }

  const setHeaderFooterElement = () => {
    setHeaderElement(<Header Mode={mode} onChangeMode={onChangeMode} onChangeMode2={onChangeMode} header_YMD={header_YMD} onChangeLoginState={onChangeLoginState} LoginState={LoginState}></Header>)
    setFooterElement(<Article Mode={mode} onChangeMode={onChangeMode} header_YMD={header_YMD} onChangeMode2={onChangeMode} onChangeLoginState={onChangeLoginState}></Article>)
  }

  //초기 렌더시 한번만 실행
  useEffect(() => {
    /* 
        let nowDate = new Date();
        set_header_YMD([nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()])
    */
    setHeaderFooterElement();
  }, [])

  useEffect(() => {
    setHeaderFooterElement();
  }, [header_YMD, LoginState])

  useEffect(() => {
    set_header_YMD([header_YMD[0], header_YMD[1], header_YMD[2]])
  }, [mode])
  //모드



  return (
    <BrowserRouter>
      <div className="App">
        {HeaderElement}
        {FooterElement}
      </div>
    </BrowserRouter>
  );
}

export default App;
