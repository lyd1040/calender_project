import React,{useState, useEffect} from "react";
import '../../../../css/Schedule.css'
import DetailSchedule from "./Detail_schedule/DetailSchedule";
import AddSchedule from "./AddSchedule/AddSchedule";
import UpdateSchedule from "./UpdateSchedule/UpdateSchedule";
import ScheduleList from "./ScheduleList/ScheduleList";
import { db } from '../../../../firebase';
import { ref, get , set } from 'firebase/database';

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
    //Detail 컴포넌트 show/hide
    const show_hide_Datail_plan_OnOff=(onOff:boolean, dataIndex:number):void=>{
        if(onOff===true){
            setdetailPlanListIndex(dataIndex);
        }
        setDetailPlanListMode(onOff)
    }

    let [Schedule_class, setSchedule_class] = useState<string | null>(null)
    let [planListMode, setPlanListMode] = useState<string>('CREATE') // 컴포넌트 변경에 필요한 모드
    let [detailPlanListMode, setDetailPlanListMode] = useState<boolean>(false) // Detail 컴포넌트를 켜고 끌 수 있는 값
    let [detailPlanListIndex, setdetailPlanListIndex] = useState<number>(NaN);
    const [planList,setPlanList] = useState<planListType[]>(
        [
            {id:NaN, title:'',content:'',date:'',time:''},
        ]
    )
    const [planComponent, setplanComponent] =useState<JSX.Element | null>(<ScheduleList ChangeplanMode={ChangeplanMode} planList={planList} show_hide_Datail_plan_OnOff={show_hide_Datail_plan_OnOff}></ScheduleList>);
    const [detailplanComponent, setdetailplanComponent] =useState<JSX.Element | null>(<></>);
    
    //일정목록을 추가할 수 있는 이벤트 함수
    const onAddPlanList=(data:planListType[]):void=>{
        setPlanList(data)
        setPlanListMode('READ');
        firebaseAddData(data)
    }

    const firebaseAddData = (data:planListType[]):void => {

    let save_UID:any = sessionStorage.getItem('userUID'); //firebase의 데이터 저장하는 경로이름
    if(sessionStorage.getItem('userUID')!==null){
        try {
            // 새로운 데이터를 Realtime Database에 추가합니다.
            const dataRef = ref(db, save_UID); // 여기에 데이터 저장 경로를 지정합니다.
            set(dataRef, data);
        } catch (error) {
            console.error('Error adding data: ', error);
        }
    }else{
        try {
            // 새로운 데이터를 Realtime Database에 추가합니다.
            const dataRef = ref(db, 'test'); // 여기에 데이터 저장 경로를 지정합니다.
                set(dataRef, data);
        } catch (error) {
            console.error('Error adding data: ', error);
        }
    }
        
    };

    //초기 마운트시
    //*필요 초기 렌더링시 파이어베이스에서 데이터 끌고와서 setPlanList에 저장해야함
    useEffect(()=>{
        let save_UID:any = sessionStorage.getItem('userUID'); //firebase의 데이터 저장하는 경로이름
        if(save_UID!==null){
            const dataRef = ref(db, save_UID); // 경로를 지정합니다.

            get(dataRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        console.log('Data found: ',data);
                        setPlanList(data)
                        setPlanListMode('READ');
                        setTimeout(()=>{setSchedule_class('show');},0);
                    } else {
                        set(dataRef, save_UID)
                        .then(() => {
                            setPlanListMode('READ');
                            setTimeout(() => {
                                setSchedule_class('show');
                            }, 0);
                        })
                        console.log('firebase 경로 확인 필요');
                    }
                })
                .catch((error) => {
                    console.error('에러 내용: ', error);
            });
        }else{
            const dataRef = ref(db, 'test'); // 경로를 지정합니다.
            get(dataRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setPlanList(data)
                        setPlanListMode('READ');
                        setTimeout(()=>{setSchedule_class('show');},0);
                    } else {
                        set(dataRef, planList)
                        .then(() => {
                            setPlanListMode('READ');
                            setTimeout(() => {
                                setSchedule_class('show');
                            }, 0);
                        })
                        console.log('firebase 경로 확인 필요');
                    }
                })
                .catch((error) => {
                    console.error('에러 내용: ', error);
            });
        }

        return(
            ChangeplanComponent()
        )
    },[])

    //모드변경
    useEffect(()=>{
        ChangeplanComponent()
    },[planListMode,planList])

    useEffect(()=>{
        show_hide_Datail_plan(detailPlanListMode)
    },[detailPlanListMode, detailPlanListIndex])
    

    //모드 상황에 따라 컴포넌트 바꾸기
    const ChangeplanComponent=():void=>{
        if(planListMode==='READ'){
            setplanComponent(<ScheduleList ChangeplanMode={ChangeplanMode} planList={planList} show_hide_Datail_plan_OnOff={show_hide_Datail_plan_OnOff}></ScheduleList>)
        }else if(planListMode==='UPDATE'){
            setplanComponent(<UpdateSchedule></UpdateSchedule>)
        }else{
            setplanComponent(<AddSchedule ChangeplanMode={ChangeplanMode} onAddPlanList={onAddPlanList} planList={planList}></AddSchedule>)
        }
    }
    //DetailSchedule 추가
    const show_hide_Datail_plan=(OnOff:boolean)=>{
        if(OnOff){
            setdetailplanComponent(<DetailSchedule detailPlanListIndex={detailPlanListIndex}></DetailSchedule>);
        }else{
            setdetailplanComponent(<></>)
        }
    }

    
    return(
        <div id="Schedule" className={'schedule '+ Schedule_class}>
            {detailplanComponent}
            {planComponent}
        </div>
    )
    
}

export default Schedule;