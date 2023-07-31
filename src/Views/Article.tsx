import '../css/Article.css'
import React, { useState, useEffect } from 'react';
import Contents from '../Components/Article/Contents/Contents';

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
            <Contents onChangeMode={props.onChangeMode} onChangeMode2={props.onChangeMode2} title={props.title} desc={props.desc} Mode={props.Mode}></Contents>
            {/* 컴포넌트 추가 */}
        </article>
    )
}

export default Article;