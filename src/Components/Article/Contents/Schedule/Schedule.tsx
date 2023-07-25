import React,{useState, useEffect} from "react";
import '../../../../css/Schedule.css'
import DetailSchedule from "./Detail_schedule/DetailSchedule";
import AddSchedule from "./AddSchedule/AddSchedule";
import ScheduleList from "./ScheduleList/ScheduleList";
import database from '../../../../firebase';

type Class ={
    SHclass:boolean;
};
type planListType ={
    id:number,
    title:string,
    content:string,
    date:string,
    time:string
}
function Schedule(props:Class){
    //모드 바꾸기(하위 컴포넌트에서 실행)
    const ChangeplanMode=(data:string):void=>{
        setPlanListMode(data)
    }

    let [Schedule_class, setSchedule_class] = useState<string | null>(null)
    let [planListMode, setPlanListMode] = useState<string>('READ') // 컴포넌트 변경에 필요한 모드
    const [planList,setPlanList] = useState<planListType[]>(
        [
            {id:1, title:'제목1',content:'내용1',date:'2023-07-25 ~ 2023-08-01',time:'08:00 ~ 09:00'},
            {id:2, title:'제목2',content:'내용2',date:'2023-07-26 ~ 2023-08-02',time:'08:00 ~ 09:00'},
            {id:3, title:'제목3',content:'내용3',date:'2023-07-27 ~ 2023-08-03',time:'08:00 ~ 09:00'},
            {id:4, title:'제목4',content:'내용4',date:'2023-07-28 ~ 2023-08-04',time:'08:00 ~ 09:00'},
            {id:5, title:'제목5',content:'내용5',date:'2023-07-29 ~ 2023-08-05',time:'08:00 ~ 09:00'},
        ]
    )
    const [planComponent, setplanComponent] =useState<JSX.Element | null>(<ScheduleList ChangeplanMode={ChangeplanMode} planList={planList}></ScheduleList>);
    
    //일정목록을 추가할 수 있는 이벤트 함수
    const onAddPlanList=(data:planListType[]):void=>{
        setPlanList(data)
        setPlanListMode('READ');
    }

    //초기 마운트시
    useEffect(()=>{
        if(props.SHclass===true){
            setTimeout(()=>{setSchedule_class('show');},100);
        }
        // Firebase 데이터베이스에서 데이터를 읽습니다.
        const dataRef = database.ref('data');
        dataRef.on('value', (snapshot:any) => {
        console.log(snapshot.val());
        });
    },[])

    //모드변경
    useEffect(()=>{
        ChangeplanComponent()
    },[planListMode])

    

    //모드 상황에 따라 컴포넌트 바꾸기
    const ChangeplanComponent=():void=>{
        if(planListMode==='READ'){
            setplanComponent(<ScheduleList ChangeplanMode={ChangeplanMode} planList={planList}></ScheduleList>)
        }else{
            setplanComponent(<AddSchedule ChangeplanMode={ChangeplanMode} onAddPlanList={onAddPlanList} planList={planList}></AddSchedule>)
        }
    }
    return(
        <div id="Schedule" className={'schedule '+ Schedule_class}>
            {planComponent}
        </div>
    )
}

export default Schedule;