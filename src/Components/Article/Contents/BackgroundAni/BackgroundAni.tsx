import React,{useState, useEffect} from 'react';
import '../../../../css/BackgroundAni.css';
import lottie, { AnimationItem } from 'lottie-web';


function BackgroundAni(){
    const [count,setcount] = useState<number>(0);
    const [anim, setAnim] = useState<AnimationItem | null>(null);

    const LottieDataSetting = async () => {
        if(count<1){
        const animationPath = '/lottieanimations/animation.json';
        const lottie_container:HTMLDivElement = document.getElementById('lottie-container') as HTMLDivElement;
        try {
            const response = await fetch(animationPath);
            const animationData = await response.json();
            setAnim(lottie.loadAnimation({
            container: lottie_container,
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
        }else{
        setcount(count+1);
        }
    };

    useEffect(() => {
        LottieDataSetting();
    }, []);

    useEffect(() => {
        return () => {
        
        if (anim) {
            anim.destroy();
        }
        };
    }, []);

    return(
        <div id="BackgroundAni" className='BackgroundAni'>
            <div id="lottie-container" className='lottie-container' />
        </div>
    )
}

export default BackgroundAni;