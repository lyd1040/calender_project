import { useEffect } from "react";
import '../../../../../css/updateSchedule.css'
import { db } from '../../../../../firebase';
import { ref, get, update } from 'firebase/database';

type UpdateScheduleType = {
    onUpdatePlanList(data: planListType[]): void; //Update Component에서는 Update로 활용할것
    ChangeplanMode(mode: string): void;
    planList: planListType[];
    useUpdate_PlanList_Index: number;
    Schedule_date_test: Schedule_date_test_type;
}

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

function UpdateSchedule(props: UpdateScheduleType) {
    const onUpdatePlanList = (): void | boolean => {
        const content_title: HTMLInputElement | null = document.getElementById('content_title') as HTMLInputElement;
        const content_text: HTMLInputElement | null = document.getElementById('content_text') as HTMLInputElement;
        const startDate: HTMLInputElement | null = document.getElementById('startDate') as HTMLInputElement;
        const endDate: HTMLInputElement | null = document.getElementById('endDate') as HTMLInputElement;
        const startTime: HTMLInputElement | null = document.getElementById('startTime') as HTMLInputElement;
        const endTime: HTMLInputElement | null = document.getElementById('endTime') as HTMLInputElement;

        let save_UID: any = sessionStorage.getItem('userUID'); //firebase의 데이터 저장하는 경로이름
        let dataRef;

        if (save_UID !== null) { dataRef = ref(db, save_UID); }
        else { dataRef = ref(db, 'test'); }
        get(dataRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();

                    return data;
                }
            })
            .then((data) => {
                console.log(props.useUpdate_PlanList_Index);
                let planlist_arr: planListType[] = data;
                if (content_title && content_text && startDate && endDate && startTime && endTime) {
                    if (content_title.value === '') {
                        alert('제목은 비어있을 수 없습니다.');
                        return false;
                    }
                    planlist_arr[props.useUpdate_PlanList_Index - 1].title = content_title.value;
                    if (content_text.value === '') {
                        planlist_arr[props.useUpdate_PlanList_Index - 1].content = '내용이 없습니다.';
                    } else {
                        planlist_arr[props.useUpdate_PlanList_Index - 1].content = content_text.value;
                    }
                    planlist_arr[props.useUpdate_PlanList_Index - 1].date = `${startDate.value} ~ ${endDate.value}`;
                    planlist_arr[props.useUpdate_PlanList_Index - 1].time = `${startTime.value} ~ ${endTime.value}`;

                    firebaseUpdateList(planlist_arr)
                };
            })

    }

    //파이어베이스 데이터 업데이트
    const firebaseUpdateList = (data: planListType[]) => {
        let save_UID: any = sessionStorage.getItem('userUID'); //firebase의 데이터 저장하는 경로이름
        let dataRef;
        if (save_UID !== null) { dataRef = save_UID }
        else { dataRef = 'test' };
        try {
            const updates: any = {};

            // dataArray를 사용하여 데이터 업데이트를 생성
            updates[`${dataRef}/${props.useUpdate_PlanList_Index - 1}`] = data[props.useUpdate_PlanList_Index - 1];

            // update 메서드를 사용하여 한 번에업데이트
            update(ref(db), updates);
            returnlist(data);
        } catch (error) {
            console.error('Error updating user data:', error);
        }

    }

    const returnlist = (data: planListType[]) => {
        let select_YMD: string = Select_date_update();
        let filter_list: planListType[] = [];

        let selectYMD_Date = new Date(select_YMD);

        for (let x = 0; x < data.length; x++) {
            if (
                (new Date(data[x].date.split(' ~ ')[0]).getTime() <= selectYMD_Date.getTime())
                &&
                (new Date(data[x].date.split(' ~ ')[1]).getTime() >= selectYMD_Date.getTime())
            ) {
                filter_list.push(data[x]);
            }
        }

        props.onUpdatePlanList(filter_list)
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

    const onchangedate = () => {
        //날짜변수
        let startDate: HTMLInputElement | null = document.getElementById('startDate') as HTMLInputElement;
        let endDate: HTMLInputElement | null = document.getElementById('endDate') as HTMLInputElement;
        let startDate_arr = startDate.value.split('-');
        let endDate_arr = endDate.value.split('-');

        //시간변수
        let startTime: HTMLInputElement | null = document.getElementById('startTime') as HTMLInputElement;
        let endTime: HTMLInputElement | null = document.getElementById('endTime') as HTMLInputElement;
        let startTime_arr = startTime.value.split(':');
        let endTime_arr = endTime.value.split(':');

        //날짜비교
        let start_date_time = new Date(Number(startDate_arr[0]), Number(startDate_arr[1]), Number(startDate_arr[2])).getTime();
        let end_date_time = new Date(Number(endDate_arr[0]), Number(endDate_arr[1]), Number(endDate_arr[2])).getTime();
        if (start_date_time > end_date_time) {
            endDate.value = startDate.value;
        }

        //시간비교
        if (start_date_time === end_date_time) {
            if (Number(startTime_arr[0]) > Number(endTime_arr[0])) {
                endTime.value = startTime.value;
            }

            if (Number(startTime_arr[0]) === Number(endTime_arr[0]) && Number(startTime_arr[1]) > Number(endTime_arr[1])) {
                endTime.value = startTime.value;
            }
        }
    }
    //처음 렌더링 됐을때만 실행
    useEffect(() => {
        const content_title: HTMLInputElement | null = document.getElementById('content_title') as HTMLInputElement;
        const content_text: HTMLInputElement | null = document.getElementById('content_text') as HTMLInputElement;
        const startDate: HTMLInputElement | null = document.getElementById('startDate') as HTMLInputElement;
        const endDate: HTMLInputElement | null = document.getElementById('endDate') as HTMLInputElement;
        const startTime: HTMLInputElement | null = document.getElementById('startTime') as HTMLInputElement;
        const endTime: HTMLInputElement | null = document.getElementById('endTime') as HTMLInputElement;

        let save_UID: any = sessionStorage.getItem('userUID'); //firebase의 데이터 저장하는 경로이름
        let dataRef;

        if (save_UID !== null) { dataRef = ref(db, save_UID); }
        else { dataRef = ref(db, 'test'); }
        get(dataRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();

                    return data;
                }
            })
            .then((data) => {
                content_title.value = data[props.useUpdate_PlanList_Index - 1].title;
                content_text.value = data[props.useUpdate_PlanList_Index - 1].content;
                startDate.value = data[props.useUpdate_PlanList_Index - 1].date.split(' ~ ')[0];
                endDate.value = data[props.useUpdate_PlanList_Index - 1].date.split(' ~ ')[1];
                startTime.value = data[props.useUpdate_PlanList_Index - 1].time.split(' ~ ')[0];
                endTime.value = data[props.useUpdate_PlanList_Index - 1].time.split(' ~ ')[1];
            })
    }, [])
    return (
        <div id="UpdateSchedule" className="UpdateSchedule">
            <h2>일정수정</h2>
            <button className="cancleBtn" onClick={() => { props.ChangeplanMode('READ'); }}><i className="fa-solid fa-x"></i></button>
            <div className="UpdateSchedule_center">
                <form action="">
                    <div key={'UpdateSchedule_input_title'}><label htmlFor="content_title">제목</label><input type="text" id="content_title" required /></div>
                    <div key={'UpdateSchedule_input_content'}><label htmlFor="content_text">내용</label><textarea id="content_text" /></div>

                    <div key={'UpdateSchedule_input_date'}>
                        <div>
                            <label htmlFor="startDate">날짜</label>
                            <input type="date" id="startDate" onChange={() => { onchangedate() }} />
                        </div>
                        <div>
                            <label htmlFor="endDate">~</label>
                            <input type="date" id="endDate" onChange={() => { onchangedate() }} />
                        </div>
                    </div>

                    <div key={'UpdateSchedule_input_time'}>
                        <div>
                            <label htmlFor="">시간</label>
                            <input type="time" id="startTime" onChange={() => { onchangedate() }} />
                        </div>
                        <div>
                            <label htmlFor="endTime">~</label>
                            <input type="time" id="endTime" onChange={() => { onchangedate() }} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="Schedule_btnWrap">
                <button type="submit" onClick={() => { onUpdatePlanList() }}>일정 수정</button>
            </div>
        </div>
    )
}

export default UpdateSchedule;