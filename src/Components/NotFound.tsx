import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/Calendar");
        }, 5000);
    }, []);
    return (
        <div id="NotFound">
            <h2>페이지를 찾을 수 없습니다.</h2>
            <p>5초 후 메인페이지로 이동합니다.</p>
        </div>
    )
}

export default NotFound;