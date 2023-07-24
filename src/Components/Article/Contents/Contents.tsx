import React, { useEffect, useState } from "react";
import '../../../css/Contents.css';
import Calendar from './Calendar/Calendar';
import Schedule from './Schedule/Schedule';

type ContnetsProps = {
    title: string;
    desc: string;
    Mode: string;
    onChangeMode2:(id:number) =>void
    onChangeMode: (id:number,year:number,month:number,date_text:number) => void; // 예시로 빈 함수 타입 설정
};

function Contents(props:ContnetsProps){
    const [showHideSchedule, setShowHideSchedule] = useState<boolean>(false);
    const [Schedule_Components, setScheduleComponents] =useState<JSX.Element | null>(null);

    //바뀔시 스케쥴 화면에 출력
    useEffect(()=>{
        if(showHideSchedule===true){
        setTimeout(()=>{
            setScheduleComponents(<Schedule SHclass={showHideSchedule}></Schedule>)
        },300)
        }else{
            setScheduleComponents(null);
        }
    },[showHideSchedule])
    useEffect(()=>{
        setScheduleComponents(null);
    },[])

    // showHideSchedule 바꿔주는 함수
    function changeSchedule(){
        setShowHideSchedule(!showHideSchedule);
    }


    return(
        <section className="Contents" id="Contents">
            <Calendar onChangeMode={props.onChangeMode} onChangeMode2={props.onChangeMode2} title={props.title} desc={props.desc} Mode={props.Mode} changeSchedule={changeSchedule}></Calendar>
            {Schedule_Components}
        </section>
    )
}

export default Contents;