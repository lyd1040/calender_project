import React,{useState, useEffect} from 'react';
import '../../../../css/BackgroundAni.css';
import lottie, { AnimationItem } from 'lottie-web';
import EventDays from './EventDay.json';

type BackgroundAniType ={
    header_YMD: number[];
    Schedule_date_test: Schedule_date_test_type;
}

type Schedule_date_test_type = {
    year: number;
    month: number;
    date_text: number;
}
function BackgroundAni(props:BackgroundAniType){
    
    const [anim, setAnim] = useState<AnimationItem | null>(null);
    const [EventPath,setEventPath] = useState<string>(``);

    const LottieDataSetting = async () => {
        const lottie_container:HTMLDivElement = document.getElementById('lottie-container') as HTMLDivElement;
        if(EventPath!==''){
            try {
                const response = await fetch(EventPath);
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
        }
    };

    const ChangeLottieAnimation = () =>{
        for(let x=0; x<EventDays.length; x++){
            let EventDayArray:string[] = EventDays[x].EventMD.split('-');

            if(Number(EventDayArray[0]) === props.Schedule_date_test.month && Number(EventDayArray[1]) === props.Schedule_date_test.date_text){

                setEventPath(`/lottieanimations/${EventDays[x].EventName}.json`)
                LottieDataSetting();
                break;
            }
        }

    }

    useEffect(()=>{
        setEventPath('');
        ChangeLottieAnimation();
        
        return () => {
            if (anim) {
                anim.destroy();
            }
        };
    },[props.Schedule_date_test]);


    return(
        <div id="BackgroundAni" className='BackgroundAni'>
            <div id="lottie-container" className='lottie-container' />
        </div>
    )
}

export default BackgroundAni;