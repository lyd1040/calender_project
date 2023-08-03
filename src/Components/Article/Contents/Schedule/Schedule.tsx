import { useState, useEffect } from "react";
import '../../../../css/Schedule.css'
import DetailSchedule from "./Detail_schedule/DetailSchedule";
import AddSchedule from "./AddSchedule/AddSchedule";
import UpdateSchedule from "./UpdateSchedule/UpdateSchedule";
import ScheduleList from "./ScheduleList/ScheduleList";
import { db } from '../../../../firebase';
import { ref, get, set, remove } from 'firebase/database';

type Class = {
    Schedule_date_test: Schedule_date_test_type;
    SHclass: boolean;
};
type planListType = {
    id: number,
    title: string,
    content: string,
    date: string,
    time: string
}

type Schedule_date_test_type = {
    year: number;
    month: number;
    date_text: number;
}
function Schedule(props: Class) {
    //모드 바꾸기(하위 컴포넌트에서 실행)
    const ChangeplanMode = (data: string): void => {
        setPlanListMode(data)
    }
    const save_Update_Index = (Update_Index: number): void => {
        setUseUpdate_PlanList_Index(Update_Index)
    }
    //Detail 컴포넌트 show/hide
    const show_hide_Datail_plan_OnOff = (onOff: boolean, dataIndex: number): void => {
        if (onOff === true) {
            setdetailPlanListIndex(dataIndex);
        }
        setDetailPlanListMode(onOff)
    }
    //list 목록 삭제
    const onDeleteList = (deleteIndex: number) => {

        //컨텐츠 복사본에 불러온 컨텐츠 저장
        let Delete_list: planListType[] = [];

        //복사본 수정
        let save_UID: any = sessionStorage.getItem('userUID'); //firebase의 데이터 저장하는 경로이름
        let dataRef;

        if (save_UID !== null) {dataRef = ref(db, save_UID);}
        else{dataRef = ref(db, 'test');}

        get(dataRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    return data;
                }
            })
            .then(async(data)=>{
                Delete_list=data;
                Delete_list.splice(deleteIndex-1,1);

                //일정 id 수정
                Delete_list=changeID(Delete_list);

                let usersRef;

                if (save_UID !== null) {usersRef = ref(db, save_UID);}
                else{usersRef = ref(db, 'test');}
                
                await remove(usersRef);
                await set(usersRef,Delete_list);
                printList(Delete_list);
            })
    }

    // 삭제리스트 아이디 바꾸는 리스트
    const changeID = (Delete_list:planListType[]):planListType[] =>{
        for (let x = 0; x < Delete_list.length; x++) {
            Delete_list[x].id = x + 1;
        }
        return Delete_list;
    }


    let [Schedule_class, setSchedule_class] = useState<string | null>(null)
    let [planListMode, setPlanListMode] = useState<string>('CREATE') // 컴포넌트 변경에 필요한 모드
    let [detailPlanListMode, setDetailPlanListMode] = useState<boolean>(false) // Detail 컴포넌트를 켜고 끌 수 있는 값
    let [detailPlanListIndex, setdetailPlanListIndex] = useState<number>(NaN);
    let [useUpdate_PlanList_Index, setUseUpdate_PlanList_Index] = useState<number>(NaN);
    const [planList, setPlanList] = useState<planListType[]>(
        [
            { id: NaN, title: '', content: '', date: '', time: '' },
        ]
    )
    const [planComponent, setplanComponent] = useState<JSX.Element | null>(<></>);
    const [detailplanComponent, setdetailplanComponent] = useState<JSX.Element | null>(<></>);

    //일정목록을 추가, 업데이트 할 수 있는 이벤트 함수
    const onUpdatePlanList = (data: planListType[]): void => {
        setPlanList(data)
        setPlanListMode('READ');
    }

    //선택된 데이터의 연도, 월, 일 합치기
    const Select_date_update = (): string => {
        let select_year: string = props.Schedule_date_test.year.toString();
        let select_month: number | string = props.Schedule_date_test.month;
        let select_date_text: number | string = props.Schedule_date_test.date_text;
        let select_YMD: string;

        if (select_month <= 10) {
            select_month = '0' + select_month;
        }
        if (select_date_text <= 10) {
            select_date_text = '0' + select_date_text;
        }
        select_YMD = `${select_year}-${select_month}-${select_date_text}`;

        return select_YMD;
    }

    //Planlist를 날짜에 맞게 필터해서 출력시켜주는 함수
    const printList = (data: planListType[]):void =>{
        let select_YMD: string = Select_date_update();
        let filter_list: planListType[] =[];

        let selectYMD_Date = new Date(select_YMD);

        for(let x=0; x<data.length; x++){
            if (
                (new Date(data[x].date.split(' ~ ')[0]).getTime() <= selectYMD_Date.getTime()) 
                && 
                (new Date(data[x].date.split(' ~ ')[1]).getTime() >= selectYMD_Date.getTime())
                ){
                    filter_list.push(data[x]);
            }
        }

        setPlanList(filter_list)
        setPlanListMode('READ');
    }

    //초기 마운트시
    //*필요 초기 렌더링시 파이어베이스에서 데이터 끌고와서 setPlanList에 저장해야함
    useEffect(() => {

        let save_UID: any = sessionStorage.getItem('userUID'); //firebase의 데이터 저장하는 경로이름
        let dataRef;

        if (save_UID !== null) {dataRef = ref(db, save_UID);}
        else{dataRef = ref(db, 'test');}
        get(dataRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    return data;
                } else {
                    console.log('firebase 경로 확인 필요');
                }
            })
            .then((data:planListType[])=>{
                printList(data);
                setTimeout(() => { setSchedule_class('show'); }, 0);
            })
            .catch((error) => {
                console.error('에러 내용: ', error);
            });

        return (
            ChangeplanComponent()
        )
    }, [])

    //모드변경
    useEffect(() => {
        ChangeplanComponent()
    }, [planListMode, planList, useUpdate_PlanList_Index])

    useEffect(() => {
        show_hide_Datail_plan(detailPlanListMode)
    }, [detailPlanListMode, detailPlanListIndex])


    //모드 상황에 따라 컴포넌트 바꾸기
    const ChangeplanComponent = (): void => {
        if (planListMode === 'READ') {
            setplanComponent(<ScheduleList save_Update_Index={save_Update_Index} onDeleteList={onDeleteList} ChangeplanMode={ChangeplanMode} planList={planList} show_hide_Datail_plan_OnOff={show_hide_Datail_plan_OnOff}></ScheduleList>)
        } else if (planListMode === 'UPDATE') {
            setplanComponent(<UpdateSchedule Schedule_date_test={props.Schedule_date_test} useUpdate_PlanList_Index={useUpdate_PlanList_Index} ChangeplanMode={ChangeplanMode} onUpdatePlanList={onUpdatePlanList} planList={planList}></UpdateSchedule>)
        } else {
            setplanComponent(<AddSchedule Schedule_date_test={props.Schedule_date_test} ChangeplanMode={ChangeplanMode} onUpdatePlanList={onUpdatePlanList} planList={planList}></AddSchedule>)
        }
    }
    //DetailSchedule 추가
    const show_hide_Datail_plan = (OnOff: boolean) => {
        if (OnOff) {
            setdetailplanComponent(<DetailSchedule detailPlanListIndex={detailPlanListIndex} Schedule_date_test={props.Schedule_date_test} planList={planList}></DetailSchedule>);
        } else {
            setdetailplanComponent(<></>)
        }
    }


    return (
        <div id="Schedule" className={'schedule ' + Schedule_class}>
            {detailplanComponent}
            {planComponent}
        </div>
    )

}

export default Schedule;