import React,{useState, useEffect} from "react";
import '../../../../css/Schedule.css'
import DetailSchedule from "./Detail_schedule/DetailSchedule";
import AddSchedule from "./AddSchedule/AddSchedule";
import ScheduleList from "./ScheduleList/ScheduleList";

type Class ={
    SHclass:boolean;
};
function Schedule(props:Class){
    //모드 바꾸기(하위 컴포넌트에서 실행)
    const ChangeplanMode=(data:string):void=>{
        setPlanListMode(data)
        console.log(data);
    }

    let [Schedule_class, setSchedule_class] = useState<string | null>(null)
    let [planListMode, setPlanListMode] = useState<string>('READ') // 컴포넌트 변경에 필요한 모드
    const [planComponent, setplanComponent] =useState<JSX.Element | null>(<ScheduleList ChangeplanMode={ChangeplanMode}></ScheduleList>);
    
    //초기 마운트시
    useEffect(()=>{
        if(props.SHclass===true){
            setTimeout(()=>{setSchedule_class('show');},100);
        }
    },[])

    //모드변경
    useEffect(()=>{
        ChangeplanComponent()
    },[planListMode])

    

    //모드 상황에 따라 컴포넌트 바꾸기
    const ChangeplanComponent=():void=>{
        if(planListMode==='READ'){
            setplanComponent(<ScheduleList ChangeplanMode={ChangeplanMode}></ScheduleList>)
        }else{
            setplanComponent(<AddSchedule ChangeplanMode={ChangeplanMode}></AddSchedule>)
        }
    }
    return(
        <div id="Schedule" className={'schedule '+ Schedule_class}>
            {planComponent}
        </div>
    )
}

export default Schedule;