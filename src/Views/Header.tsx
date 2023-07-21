import Nav from '../Components/Nav';
import './css/header.css';

type ContentItem = {
    id: number;
    title: string;
    desc: string;
  };
  
  type NavProps = {
    header_Menu: ContentItem[];
    onChangeMode: (id:number) => void; // 예시로 빈 함수 타입 설정
  };

//gnb 타입지정
function Header(props:NavProps){
    console.log(props)
    return(
        <header>
            <h1><a href={/read/+'0'} onClick={event=>{event.preventDefault(); props.onChangeMode(0)}}>WEB</a></h1>
            <Nav header_Menu={props.header_Menu} onChangeMode={props.onChangeMode}></Nav>
        </header>
    )
}

export default Header;