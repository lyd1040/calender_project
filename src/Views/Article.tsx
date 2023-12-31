import '../css/Article.css'
import Contents from '../Components/Article/Contents/Contents';
import SignIn_SignUp from '../Components/Article/SignIn_SignUp/SignIn_SignUp';
import Contect from '../Components/Article/Contect/Contect';
import NotFound from '../Components/NotFound';
import { Routes, Route } from 'react-router-dom';

type ContnetsProps = {
    Mode: string;
    header_YMD: number[];
    onChangeLoginState: (state: boolean) => void;
    onChangeMode2: (id: number) => void
    onChangeMode: (id: number, year?: number, month?: number, date_text?: number) => void; // 예시로 빈 함수 타입 설정
};

function Article(props: ContnetsProps) {
    return (
        <article>
            <Routes>
                {/* 중복 라우터를 사용할때 '*'을 꼭 입력해야함 path="경로/*" *의 의미는 현재 경로 하위에 경로가 더 있다는 걸 알려주는 것 */}
                <Route path='/Calendar' element={<Contents onChangeMode={props.onChangeMode} header_YMD={props.header_YMD} onChangeMode2={props.onChangeMode2} Mode={props.Mode} />} />
                <Route path='Calendar/SignIn_SignUp' element={<SignIn_SignUp onChangeLoginState={props.onChangeLoginState} />} />
                <Route path='Calendar/Contect' element={<Contect />} />
                <Route path='Calendar/*' element={<NotFound />} />
            </Routes>
        </article>
    )
}

export default Article;