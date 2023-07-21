import React,{useState} from 'react';
import Header from './Views/Header';
import Contents from './Views/Contents';

function App() {
  //header menu
  type ContentItem = {
    id: number;
    title: string;
    desc: string;
  };
  let [header_Menu,set_Header_Menu] = useState<ContentItem[]>(
    [
      {id:1,title:'HTML',desc:'HTML is...'},
      {id:2,title:'CSS',desc:'CSS is...'},
      {id:3,title:'JS',desc:'JS is...'}
    ]
  )

  // READ일 때 선택된 컨텐츠 번호
  let [contents_number,setContentsNumber] = useState<number>(0);
  //모드 바꾸기
  const onChangeMode=(data:number) :void=>{
    console.log(data)
    if(data===0){
      setMode('WELCOME');
    }else{
      setMode('READ');
      setContentsNumber(data);
    }
  }

  //모드
  let [mode, setMode] = useState<string>('WELCOME');

  //모드에 따른 컨텐츠 타이틀과 내용
  let contents_title:string='';
  let contents_desc:string='';

  //모드 확인
  if(mode === 'WELCOME'){
    contents_title='Wel Come to my Page';
    contents_desc='Hello~~'
  }else{
    for(let x:number=0; x<header_Menu.length; x++){
      if(contents_number === x+1){
        contents_title=header_Menu[x].title;
        contents_desc=header_Menu[x].desc;
      }
    }
  }
  return (
    <div className="App">
      <Header header_Menu={header_Menu} onChangeMode={onChangeMode}></Header>
      <Contents title={contents_title} desc={contents_desc}></Contents>
    </div>
  );
}

export default App;
