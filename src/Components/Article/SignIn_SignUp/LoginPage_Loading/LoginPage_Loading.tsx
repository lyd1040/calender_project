import React, { useState, useEffect } from 'react';
import '../../../../css/LoginPage_Loading.css'

function LoginPage_Loading() {
    const [LoadingPoints, setLoadingPoints] = useState<JSX.Element[]>([]);
    let [AddClass, setAddClass] = useState<number>(0);
    const Loading = () => {
        let spanlength = 5;
        let Points: JSX.Element[] = [];

        const spanStylearr: React.CSSProperties[] = []
        for (let x = 0; x < spanlength; x++) {
            spanStylearr.push({
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '1px solid #fff',
                animationDelay: `calc(${x} * 1s)`,
            })
        }

        for (let x = 0; x < spanlength; x++) {
            Points.push(
                <span key={'LoadingAnimation' + x} className='spans' style={spanStylearr[x]}></span>
            )
        }
        setLoadingPoints(Points)
    }

    useEffect(() => {
        Loading();
    }, [])
    return (
        <div id="LoginPage_Loading_wrap" className='LoginPage_Loading_wrap'>
            <div>
                {LoadingPoints}
            </div>
            <p className='LoadingText'>Loading...</p>
        </div>
    )
}

export default LoginPage_Loading;