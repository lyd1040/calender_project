import '../../../css/nav.css';

//gnb 타입지정
type ContentItem = {
    id: number;
    title: string;
    desc: string;
  };
  
  type NavProps = {
    header_Menu: ContentItem[];
    onChangeMode: (id:number) => void; // 예시로 빈 함수 타입 설정
  };

function Nav(props:NavProps){

    let header_menu_list = props.header_Menu.map((item: ContentItem)=>(
        <li key={item.id}>
            <a href={'/read/'+item.id} onClick={(event)=>{event.preventDefault(); props.onChangeMode(item.id)}}>{item.title}</a>
        </li>
    ))
    return(
        <nav>
            {header_menu_list}
        </nav>
    )
}

export default Nav;