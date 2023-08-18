import { useState, useEffect } from "react";
import { db } from '../../../../../firebase';
import { ref, get, set } from 'firebase/database';
import '../../../../../css/AddSchedule.css'

type AddFirebaseType = {
    id: number,
    schedulecontents: {
        birth: boolean,
        exercise: boolean,
        just: boolean,
        shopping: boolean,
        travel: boolean
    },
    title: string,
    content: string,
    date: string,
    time: string

}

type planListType = {
    id: number,
    title: string,
    content: string,
    date: string,
    time: string
}
type AddSchedule_props = {
    ScheduleWidthClass: boolean;
    onUpdatePlanList(data: planListType[]): void;
    ChangeplanMode(mode: string): void;
    planList: planListType[];
    Schedule_date_test: Schedule_date_test_type;
}

type Schedule_date_test_type = {
    year: number;
    month: number;
    date_text: number;
}

interface RadioOption {
    value: string;
    label: string;
}

function AddSchedule(props: AddSchedule_props) {
    const [MediaWidthClass, setMediaWidthClass] = useState<string>('');
    const options: RadioOption[] = [
        { value: 'birth', label: '생일' },
        { value: 'exercise', label: '운동' },
        { value: 'just', label: '일상' },
        { value: 'shopping', label: '쇼핑' },
        { value: 'travel', label: '여행' },
    ];
    const [selectedOption, setSelectedOption] = useState<string>(options[0].value);

    const onAddPlanList = (): void | boolean => {
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
                    return data
                }
            })
            .then((data) => {
                let list: AddFirebaseType = {
                    id: data.length + 1,
                    schedulecontents: {
                        birth: selectedOption === "birth" ? true : false,
                        exercise: selectedOption === "exercise" ? true : false,
                        just: selectedOption === "just" ? true : false,
                        shopping: selectedOption === "shopping" ? true : false,
                        travel: selectedOption === "travel" ? true : false
                    },
                    title: '',
                    content: '',
                    date: '',
                    time: ''
                }
                if (content_title && content_text && startDate && endDate && startTime && endTime) {
                    if (content_title.value === '') {
                        alert('제목은 비어있을 수 없습니다.');
                        return false;
                    }
                    list.title = content_title.value;
                    if (content_text.value === '') {
                        list.content = '내용이 없습니다.';
                    } else {
                        list.content = content_text.value;
                    }
                    list.date = `${startDate.value} ~ ${endDate.value}`;
                    list.time = `${startTime.value} ~ ${endTime.value}`;

                    firebaseAddData(list, data);
                };
            })
    }

    //firebase 데이터 추가
    const firebaseAddData = (list: planListType, data: planListType[]): void => {
        let save_UID: any = sessionStorage.getItem('userUID'); //firebase의 데이터 저장하는 경로이름
        let dataRef;
        if (save_UID !== null) { dataRef = ref(db, save_UID); }
        else { dataRef = ref(db, 'test'); }
        set(dataRef, [...data, list]);

        get(dataRef)
            .then((snapshot) => {
                if (snapshot.exists())
                    return snapshot.val();
            })
            .then((snapshotValue) => {
                returnList(snapshotValue);
            })

    }

    const returnList = (data: planListType[]): void => {

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

    //라디오버튼 선택 바꾸기
    const ChangeRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    //마운트시 한번만 실행
    useEffect(() => {
        const startDate: HTMLInputElement | null = document.getElementById('startDate') as HTMLInputElement;
        const endDate: HTMLInputElement | null = document.getElementById('endDate') as HTMLInputElement;
        const startTime: HTMLInputElement | null = document.getElementById('startTime') as HTMLInputElement;
        const endTime: HTMLInputElement | null = document.getElementById('endTime') as HTMLInputElement;
        let nowdate: Date = new Date();

        let nowMonth: number | string = nowdate.getMonth() + 1;
        let nowDate: number | string = nowdate.getDate();
        let nowHours: number | string = nowdate.getHours();
        let nowMinutes: number | string = nowdate.getMinutes();

        if (nowMonth < 10) { nowMonth = '0' + nowMonth.toString() }
        if (nowDate < 10) { nowDate = '0' + nowDate.toString() }
        if (nowHours < 10) { nowHours = '0' + nowHours.toString() }
        if (nowMinutes < 10) { nowMinutes = `0${nowMinutes}` }

        startDate.value = `${nowdate.getFullYear()}-${nowMonth}-${nowDate}`;
        endDate.value = `${nowdate.getFullYear()}-${nowMonth}-${nowDate}`;
        startTime.value = `${nowHours}:${nowMinutes}`;
        endTime.value = `23:59`;
    }, [])

    useEffect(() => {
        if (props.ScheduleWidthClass === true) {
            setMediaWidthClass('MediaWidth');
        } else {
            setMediaWidthClass('');
        }
    }, [props.ScheduleWidthClass])

    return (
        <div id="AddSchedule" className={`AddSchedule ${MediaWidthClass}`}>
            <h3>일정추가</h3>
            <button className="cancleBtn" onClick={() => { props.ChangeplanMode('READ'); }}><i className="fa-solid fa-x"></i></button>
            <div className="AddSchedule_center">
                <form action="">
                    <div key={'AddSchedule_input_title'}><label htmlFor="content_title">제목</label><input type="text" id="content_title" required /></div>
                    <div key={'AddSchedule_input_content'}><label htmlFor="content_text">내용</label><textarea id="content_text" /></div>

                    <div key={'AddSchedule_input_date'} className="StartEndDateWrap">
                        <div>
                            <label htmlFor="startDate">날짜</label>
                            <input type="date" id="startDate" onChange={() => { onchangedate() }} />
                        </div>
                        <div>
                            <label htmlFor="endDate"> ~ </label>
                            <input type="date" id="endDate" onChange={() => { onchangedate() }} />
                        </div>
                    </div>

                    <div key={'AddSchedule_input_time'} className="StartEndTimeWrap">
                        <div>
                            <label htmlFor="startTime">시간</label>
                            <input type="time" id="startTime" onChange={() => { onchangedate() }} />
                        </div>
                        <div>
                            <label htmlFor="endTime"> ~ </label>
                            <input type="time" id="endTime" onChange={() => { onchangedate() }} />
                        </div>
                    </div>

                    <div className="ScheduleRadioBox">
                        {options.map((option) => (
                            <label key={option.value}>
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={selectedOption === option.value}
                                    onChange={ChangeRadioBtn}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </form>
            </div>
            <div className="Schedule_btnWrap">
                <button type="submit" onClick={() => { onAddPlanList() }}>일정 추가</button>
            </div>
        </div>
    )
}

export default AddSchedule;