import React, { useEffect, useState } from 'react';
import Header from './Views/Header';
import Article from './Views/Article';
import { BrowserRouter } from 'react-router-dom';

function App() {
  let [LoginState, setLoginState] = useState<boolean>(false);  //false ="로그인 해야됨" , true="로그인 되어있음"
  let [header_YMD, set_header_YMD] = useState<number[]>([
    NaN, //year
    NaN, //month
    NaN //date
  ])
  let [mode, setMode] = useState<string>('WELCOME');

  //모드 바꾸기
  const onChangeMode = (data: number, year?: number, month?: number, date?: number): void => {
    if (data === 0) {
      setMode('WELCOME');
    } else {
      setMode('READ');

      if (year !== undefined && month !== undefined && date !== undefined) {
        set_header_YMD([year, month, date]);
      } else {
        console.log('YMD not provided');
        set_header_YMD([]);
      }
    }
  }

  const onChangeLoginState = (state: boolean): void => {
    setLoginState(state);
  }

  //초기 렌더시 한번만 실행
  useEffect(() => {
    let nowDate = new Date();
    set_header_YMD([nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()])
  }, [])

  useEffect(() => {
    set_header_YMD([header_YMD[0], header_YMD[1], header_YMD[2]])
  }, [mode])
  //모드


  //모드에 따른 컨텐츠 타이틀과 내용
  let contents_title: string = '';
  let contents_desc: string = '';

  //모드 확인
  if (mode === 'WELCOME') {
    contents_title = 'Wel Come to my Page';
    contents_desc = 'Hello~~'
  } else {

  }
  return (
    <BrowserRouter>
      <div className="App">
        <Header Mode={mode} onChangeMode={onChangeMode} onChangeMode2={onChangeMode} header_YMD={header_YMD} onChangeLoginState={onChangeLoginState} LoginState={LoginState}></Header>
        <Article Mode={mode} title={contents_title} desc={contents_desc} onChangeMode={onChangeMode} header_YMD={header_YMD} onChangeMode2={onChangeMode} onChangeLoginState={onChangeLoginState}></Article>
      </div>
    </BrowserRouter>
  );
}

export default App;
