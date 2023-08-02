import '../css/Article.css'
import React, { useState, useEffect } from 'react';
import Contents from '../Components/Article/Contents/Contents';
import SignIn_SignUp from '../Components/Article/SignIn_SignUp/SignIn_SignUp';
import Contect from '../Components/Article/Contect/Contect';
import NotFound from '../Components/NotFound';
import { Routes, Route } from 'react-router-dom';

type ContnetsProps = {
    title: string;
    desc: string;
    Mode: string;
    onChangeMode2: (id: number) => void
    onChangeMode: (id: number, year?: number, month?: number, date_text?: number) => void; // 예시로 빈 함수 타입 설정
};

function Article(props: ContnetsProps) {
    return (
        <article>
            <Routes>
                {/* 중복 라우터를 사용할때 '*'을 꼭 입력해야함 path="경로/*" *의 의미는 현재 경로 하위에 경로가 더 있다는 걸 알려주는 것 */}
                <Route path='/' element={<Contents onChangeMode={props.onChangeMode} onChangeMode2={props.onChangeMode2} title={props.title} desc={props.desc} Mode={props.Mode} />} />
                <Route path='SignIn_SignUp' element={<SignIn_SignUp />} />
                <Route path='Contect' element={<Contect />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </article>
    )
}

export default Article;