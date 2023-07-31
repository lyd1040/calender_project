import '../../../css/nav.css';
import { Link } from 'react-router-dom';

//gnb 타입지정
type ContentItem = {
    id: number;
    title: string;
    desc: string;
};

type NavProps = {
    header_Menu: ContentItem[];
    onChangeMode: (id: number) => void; // 예시로 빈 함수 타입 설정
};

function Nav(props: NavProps) {

    let header_menu_list = props.header_Menu.map((item: ContentItem) => (
        <li key={item.id}>
            <Link to='/'>{item.title}</Link> {/* 예시 */}
            {/* <a href={'/read/'+item.id} onClick={(event)=>{event.preventDefault(); props.onChangeMode(item.id)}}>{item.title}</a> */}
        </li>
    ))
    return (
        <div id='gnb'>
            <button className='show_gnb'></button>
            <nav>
                <ul>
                    {header_menu_list}
                </ul>
            </nav>
        </div>
    )
}

export default Nav;