import React, { useEffect, useState } from 'react';
import Header from './Views/Header';
import Article from './Views/Article';
import { BrowserRouter } from 'react-router-dom';

function App() {

  let [header_YMD, set_header_YMD] = useState<number[]>([
    NaN, //year
    NaN, //month
    NaN //date
  ])
  let [mode, setMode] = useState<string>('WELCOME');
  // READ일 때 선택된 컨텐츠 번호
  let [contents_number, setContentsNumber] = useState<number>(0);
  //모드 바꾸기
  const onChangeMode = (data: number, year?: number, month?: number, date?: number): void => {
    if (data === 0) {
      setMode('WELCOME');
    } else {
      setMode('READ');
      setContentsNumber(data);

      if (year !== undefined && month !== undefined && date !== undefined) {
        set_header_YMD([year, month, date]);
      } else {
        console.log('YMD not provided');
        set_header_YMD([]);
      }
    }
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
        <Header Mode={mode} onChangeMode={onChangeMode} header_YMD={header_YMD}></Header>
        <Article Mode={mode} title={contents_title} desc={contents_desc} onChangeMode={onChangeMode} onChangeMode2={onChangeMode}></Article>
      </div>
    </BrowserRouter>
  );
}

export default App;
