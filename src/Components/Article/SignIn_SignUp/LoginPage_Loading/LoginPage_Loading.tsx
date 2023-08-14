import React, { useState, useEffect } from 'react';
import '../../../../css/LoginPage_Loading.css'
import lottie, { AnimationItem } from 'lottie-web';

function LoginPage_Loading() {
    const [anim, setAnim] = useState<AnimationItem | null>(null);
    const Loading = async (): Promise<void> => {

        let Points: HTMLDivElement = document.getElementById('LoginLoading') as HTMLDivElement;

        try {
            console.log('a');
            const response = await fetch('lottieanimations/Loading.json');
            const animationData = await response.json();
            setAnim(lottie.loadAnimation({
                container: Points,
                animationData: animationData,
                loop: true,
                autoplay: true,
                renderer: 'svg', // 선택한 렌더러 (svg, canvas, html 등)
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                },
            }));
        } catch (error) {
            console.error('Failed to fetch animation data', error);
        }
    }

    useEffect(() => {
        Loading();

        return () => {
            if (anim) {
                anim.destroy();
            }
        };
    }, [])
    return (
        <div id="LoginPage_Loading_wrap" className='LoginPage_Loading_wrap'>
            <div id="LoginLoading" className='LoginLoading' />
        </div>
    )
}

export default LoginPage_Loading;