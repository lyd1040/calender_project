import React, { useState, useEffect } from "react";
import { db } from '../../../../firebase';
import { ref, get } from 'firebase/database';
import '../../../../css/Calendar.css'

type ContnetsProps = {
    Mode: string;
    showHideSchedule: boolean;
    bgChangeFromCalendar: (year: number, month: number, date_text: number) => void;
    onChangeMode2: (id: number) => void
    changeSchedule: () => void
    onChangeMode: (id: number, year: number, month: number, date_text: number) => void; // 예시로 빈 함수 타입 설정
};

type UserInfoType = {
    content: string,
    date: string,
    id: number,
    schedulecontents: ScheduleContents,
    time: string,
    title: string
}
type ScheduleContents = {
    birth: true;
    exercise: true;
    just: true;
    shopping: true;
    travel: true;

}


function Calendar(props: ContnetsProps) {

    /* 상위 컴포넌트 함수 실행시키는 함수들 */
    // 날짜 클릭시 Header에 날짜 출력 및 캘린더 숨기고 나타내는 함수 (App.tsx)
    const hide_calendar = (year: number, month: number, date_text: number): void => {
        const element: HTMLElement | null = document.getElementById('Calendar');
        if (element) {
            element.classList.add('hide');
        }
        props.onChangeMode(1, year, month + 1, date_text);
    }
    const show_calendar = (): void => {
        const element: HTMLElement | null = document.getElementById('Calendar');
        if (element) {
            element.classList.remove('hide');
        }
        props.onChangeMode2(0);
    }

    //스케줄 나타내고 숨기기(Contents.tsx)
    const changeSchedule = (): void => {
        props.changeSchedule();
    }


    /* 날짜 관련 함수 및 변수 */
    const calender_date: Date = new Date();
    const [year_month_date_text, set_year_month_date_text] = useState<number[]>(
        [
            calender_date.getFullYear(),
            calender_date.getMonth() + 1,
            calender_date.getDate()
        ]
    )
    const calender_day: string[] = ['일', '월', '화', '수', '목', '금', '토']

    /* 화면 출력 */
    //화면 출력될 tr,td 저장 변수
    let [change_date, setChange_date] = useState<JSX.Element[]>();
    let day_list: JSX.Element[] = calender_day.map(
        (days: string, index: number) => {
            return <th key={index}>{days}</th>
        });

    //년도, 월, 일 저장변수
    let [print_year_month_date, set_print_year_month_date] = useState<JSX.Element[]>();

    /* 계산 함수들 (element 생성 함수 포함)*/
    //년도, 월, 일 그리기
    const year_month_date_printer = (text_list: number[]): JSX.Element[] => {
        let data: number = 0
        let ko_text: string = '';
        let year_month_date_text: string = '';
        let new_YMD_list: JSX.Element[] = [];

        text_list.forEach((e: number, idx: number) => {
            if (idx === 0) { year_month_date_text = 'year'; data = text_list[0]; ko_text = '년' }
            else if (idx === 1) { year_month_date_text = 'month'; data = text_list[1]; ko_text = '월' }
            else { year_month_date_text = 'date'; data = text_list[2]; ko_text = '일' }

            if (idx < 2) {
                new_YMD_list.push(
                    <div id={`${year_month_date_text}wrap`} className={`${year_month_date_text}wrap`} key={'year_month_date_text' + idx}>
                        <button type='button' className={`${year_month_date_text}Prev prev`} onClick={prev_click_evt}><i className="fa-solid fa-chevron-left"></i></button>
                        <span>{data}{ko_text}</span>
                        <button type='button' className={`${year_month_date_text}Next next`} onClick={next_click_evt}><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                )
            }
        })

        return new_YMD_list;
    }
    //년도, 월, 일 이전화살표 클릭 이벤트 핸들러
    const prev_click_evt = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const target = event.target as HTMLElement;

        if (target.classList.contains('yearPrev')) {
            set_year_month_date_text([
                year_month_date_text[0] - 1,
                year_month_date_text[1],
                year_month_date_text[2]
            ]);
        }
        else if (target.classList.contains('monthPrev')) {
            if (year_month_date_text[1] > 1) {
                set_year_month_date_text([
                    year_month_date_text[0],
                    year_month_date_text[1] - 1,
                    year_month_date_text[2]
                ]);
            } else {
                set_year_month_date_text([
                    year_month_date_text[0] - 1,
                    12,
                    year_month_date_text[2]
                ]);
            }
        }
        else if (target.classList.contains('datePrev')) {
            set_year_month_date_text([
                year_month_date_text[0],
                year_month_date_text[1],
                year_month_date_text[2] - 1
            ]);
        }
        localStorage.setItem('year_month_date_text_year', year_month_date_text[0].toString());
        localStorage.setItem('year_month_date_text_month', (year_month_date_text[1] - 1).toString());
    }

    //년도, 월, 일 이전화살표 클릭 이벤트 핸들러
    const next_click_evt = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('yearNext')) {
            set_year_month_date_text([
                year_month_date_text[0] + 1,
                year_month_date_text[1],
                year_month_date_text[2]
            ]);
        }
        else if (target.classList.contains('monthNext')) {
            if (year_month_date_text[1] < 12) {
                set_year_month_date_text([
                    year_month_date_text[0],
                    year_month_date_text[1] + 1,
                    year_month_date_text[2]
                ]);
            } else {
                set_year_month_date_text([
                    year_month_date_text[0] + 1,
                    1,
                    year_month_date_text[2]
                ]);
            }
        }
        else if (target.classList.contains('dateNext')) {
            set_year_month_date_text([
                year_month_date_text[0],
                year_month_date_text[1],
                year_month_date_text[2] + 1
            ]);
        }
        localStorage.setItem('year_month_date_text_year', year_month_date_text[0].toString());
        localStorage.setItem('year_month_date_text_month', (year_month_date_text[1] - 1).toString());
    }

    //날짜 테이블 생성 및 날짜 그리기
    const date_print = (data: UserInfoType[], year: number, month: number): JSX.Element[] => {
        localStorage.setItem('date_text', '1'); // 날짜 세기위한 카운트
        localStorage.setItem('month_box_length', '1');

        const date_tr: JSX.Element[] = [];
        const date_separat = date_separation(year, month);

        for (let x = 0; x < date_separat; x++) {
            date_tr.push(<tr key={'date_separat' + x}>{create_td(data, x, date_separat, year, month)}</tr>)
        }

        return date_tr;
    }
    //해당 월이 몇주인지 계산(필요한 데이터: 연도, 월, 요일(인덱스))
    const date_separation = (year: number, month: number): number => {
        let week_calc = new Date(year, month, 1);
        let month_last_date = new Date(year, month + 1, 0);
        return Math.ceil((week_calc.getDay() + month_last_date.getDate()) / 7);
    }

    //td생성
    const create_td = (data: UserInfoType[], tr_idx: number, tr_list_idx: number, year: number, month: number): JSX.Element[] => {
        const date_td: JSX.Element[] = [];
        const DateToday: Date = new Date();
        const TodayYear: number = DateToday.getFullYear();
        const TodayMonth: number = DateToday.getMonth() + 1;
        const TodayDate: number = DateToday.getDate();
        //현재 날짜의 1일의 요일 인덱스 ex(2023-07-01) => 토요일(index=6)
        const frist_week_first_day: number = new Date(year, month, 1).getDay();
        //현재 날짜의 마지막 일
        const last_week_last_date: number = new Date(year, month + 1, 0).getDate();
        let Aclass: string = '';

        let date_text: number = Number(localStorage.getItem('date_text')); //날짜
        let month_box_length = Number(localStorage.getItem('month_box_length'));

        let AddClassToday: string = '';

        //날짜 텍스트 그리기
        for (let x = (tr_idx * 7); x < (tr_idx * 7) + 7; x++) {
            if ((x + 1) % 7 === 0) {
                Aclass = 'saturday';
            } else if (x % 7 === 0) {
                Aclass = 'sunday';
            } else {
                Aclass = '';
            }
            if (year === TodayYear && month + 1 === TodayMonth && date_text === TodayDate) { AddClassToday = 'today'; }
            else { AddClassToday = ''; }

            if (tr_idx === 0) {
                if (x >= frist_week_first_day) {
                    date_td.push(DataSetting(data, date_text, AddClassToday, year, month, x, frist_week_first_day, Aclass));
                    date_text++;
                } else {
                    date_td.push(<td key={'date_text' + date_text + x}></td>)
                }
            } else if (tr_idx <= tr_list_idx - 2) {
                date_td.push(DataSetting(data, date_text, AddClassToday, year, month, x, frist_week_first_day, Aclass));
                date_text++;
            } else {
                if (date_text <= last_week_last_date) {
                    date_td.push(DataSetting(data, date_text, AddClassToday, year, month, x, frist_week_first_day, Aclass));
                    date_text++;
                } else {
                    date_td.push(<td key={'date_text' + date_text + x}></td>)
                }
            }
        }

        localStorage.setItem('date_text', `${date_text}`);
        localStorage.setItem('month_box_length', `${month_box_length}`);

        if (Number(localStorage.getItem('date_text')) === last_week_last_date + 1) {
            localStorage.removeItem('date_text');
            localStorage.removeItem('month_box_length');
            localStorage.removeItem('year_month_date_text_year');
            localStorage.removeItem('year_month_date_text_month');
        }
        return date_td;
    }

    //날짜(td) 세팅
    const DataSetting = (data: UserInfoType[], date_text: number, AddClassToday: string, year: number, month: number, idx: number, frist_week_first_day: number, Aclass: string) => {
        let stickerWrapElement: JSX.Element[] = [];
        let stickerWrapElementClass: string[] = [];

        //해당 날짜에 부착할 div태그 클래스 배열 데이터 추가
        for (let x = 0; x < data.length; x++) {
            const dataYMDsplit: string[] = data[x].date.split(" ~ ");
            const dataSE_YMD: Date[] = [new Date(dataYMDsplit[0]), new Date(dataYMDsplit[1])];
            const nowDate: Date = new Date(year, month, date_text);

            if (BooleanYMD(dataSE_YMD, nowDate) && ScheduleContentsLength(data[x].schedulecontents) > 0) {
                stickerWrapElementClass.push(ScheduleAddClass(data[x].schedulecontents));
            }
        }

        //클래스 정렬후 중복제거
        stickerWrapElementClass = stickerWrapElementClass.sort();
        if (stickerWrapElementClass.length > 1) {
            for (let x = 0; x < stickerWrapElementClass.length; x++) {
                if (stickerWrapElementClass[x] === stickerWrapElementClass[x + 1]) {
                    stickerWrapElementClass.splice(x, 1);
                }
            }
        }

        //클래스 수만큼 스티커 부착
        for (let y = 0; y < stickerWrapElementClass.length; y++) {
            stickerWrapElement.push(<div className={`sticker${stickerWrapElementClass[y]}`}></div>)
        }

        return <td key={'date_text' + date_text + idx} className={AddClassToday} onClick={() => { hide_calendar(year, month, (idx + 1) - frist_week_first_day); props.bgChangeFromCalendar(year, month, (idx + 1) - frist_week_first_day); changeSchedule(); }}>
            <a href="/" className={Aclass} onClick={event => { event.preventDefault(); }}>{date_text}</a>
            <div className="sticker_wrap">
                {stickerWrapElement}
            </div>
        </td>
    }


    //년 월 일 같은지 봐주는 함수
    const BooleanYMD = (dataSE_YMD: Date[], nowDate: Date): boolean => {
        if (dataSE_YMD[0].getFullYear() === nowDate.getFullYear() && nowDate.getFullYear() === dataSE_YMD[1].getFullYear()) {
            if (dataSE_YMD[0].getMonth() === nowDate.getMonth() && nowDate.getMonth() === dataSE_YMD[1].getMonth()) {
                if (dataSE_YMD[0].getDate() === nowDate.getDate() && nowDate.getDate() === dataSE_YMD[1].getDate()) {
                    return true;
                }
            }
        }
        return false;
    }

    const ScheduleAddClass = (data: ScheduleContents): string => {
        let dataStr: string = '';

        if (data.birth === true) {
            dataStr = 'birth';
        }
        if (data.exercise === true) {
            dataStr = 'exercise';
        }
        if (data.just === true) {
            dataStr = 'just';
        }
        if (data.shopping === true) {
            dataStr = 'shopping';
        }
        if (data.travel === true) {
            dataStr = 'travel';
        }

        return dataStr;
    }

    //일정 개수 세주는 함수
    const ScheduleContentsLength = (data: ScheduleContents): number => {
        let count: number = 0;

        if (data.birth === true) {
            count++;
        }
        if (data.exercise === true) {
            count++;
        }
        if (data.just === true) {
            count++;
        }
        if (data.shopping === true) {
            count++;
        }
        if (data.travel === true) {
            count++;
        }

        return count;
    }


    // 최초 렌더링 시에만 함수를 호출하여 초기값 설정후 출력
    useEffect(() => {
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
                set_print_year_month_date(year_month_date_printer(year_month_date_text));
                setChange_date(date_print(data, year_month_date_text[0], year_month_date_text[1] - 1));
            })

    }, [year_month_date_text, props.showHideSchedule]);


    return (
        <div id="Calendar" className='Calendar'>
            <div id="year_month_date" className='year_month_date'>
                {print_year_month_date}
            </div>

            <table>
                <thead>
                    <tr>
                        {day_list}
                    </tr>
                </thead>
                <tbody>
                    {change_date}
                </tbody>
            </table>

            <a href="/" className='show_calendar' onClick={e => { e.preventDefault(); show_calendar(); changeSchedule(); }}><i className="fa-solid fa-chevron-right"></i></a>
        </div>
    )
}

export default Calendar;