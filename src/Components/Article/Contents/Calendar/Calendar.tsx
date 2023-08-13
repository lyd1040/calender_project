import React, { useState, useEffect } from "react";
import '../../../../css/Calendar.css'

type ContnetsProps = {
    Mode: string;
    bgChangeFromCalendar: (year: number, month: number, date_text: number) => void;
    onChangeMode2: (id: number) => void
    changeSchedule: () => void
    onChangeMode: (id: number, year: number, month: number, date_text: number) => void; // 예시로 빈 함수 타입 설정
};


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
    const next_click_evt =(event: React.MouseEvent<HTMLButtonElement>): void => {
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
    const date_print = (year: number, month: number): JSX.Element[] => {
        localStorage.setItem('date_text', '1'); // 날짜 세기위한 카운트
        localStorage.setItem('month_box_length', '1');

        const date_tr: JSX.Element[] = [];
        const date_separat = date_separation(year, month);

        for (let x = 0; x < date_separat; x++) {
            date_tr.push(<tr key={'date_separat' + x}>{create_td(x, date_separat, year, month)}</tr>)
        }

        return date_tr;
    }
    //해당 월이 몇주인지 계산(필요한 데이터: 연도, 월, 요일(인덱스))
    const date_separation =(year: number, month: number): number => {
        let week_calc = new Date(year, month, 1);
        let month_last_date = new Date(year, month + 1, 0);
        return Math.ceil((week_calc.getDay() + month_last_date.getDate()) / 7);
    }

    //td생성
    const create_td = (tr_idx: number, tr_list_idx: number, year: number, month: number): JSX.Element[] => {
        const date_td: JSX.Element[] = [];
        //현재 날짜의 1일의 요일 인덱스 ex(2023-07-01) => 토요일(index=6)
        const frist_week_first_day: number = new Date(year, month, 1).getDay();
        //현재 날짜의 마지막 일
        const last_week_last_date: number = new Date(year, month + 1, 0).getDate();
        let Aclass: string = '';

        let date_text: number = Number(localStorage.getItem('date_text')); //날짜
        let month_box_length = Number(localStorage.getItem('month_box_length'));

        //날짜 텍스트 그리기
        if (tr_idx === 0) {
            for (let x = (tr_idx * 7); x < (tr_idx * 7) + 7; x++) {
                if ((x + 1) % 7 === 0) {
                    Aclass = 'saturday';
                } else if (x % 7 === 0) {
                    Aclass = 'sunday';
                } else {
                    Aclass = '';
                }
                if (x >= frist_week_first_day) {
                    date_td.push(
                        <td key={'date_text' + date_text + x} onClick={() => { hide_calendar(year, month, (x + 1) - frist_week_first_day); props.bgChangeFromCalendar(year, month, (x + 1) - frist_week_first_day); changeSchedule(); }}>
                            <a href="/" className={Aclass} onClick={event => { event.preventDefault(); }}>{date_text++}</a>
                        </td>
                    );
                } else {
                    date_td.push(<td key={'date_text' + date_text + x}></td>)
                }
            }
        } else if (tr_idx <= tr_list_idx - 2) {
            for (let x = (tr_idx * 7); x < (tr_idx * 7) + 7; x++) {
                if ((x + 1) % 7 === 0) {
                    Aclass = 'saturday';
                } else if (x % 7 === 0) {
                    Aclass = 'sunday';
                } else {
                    Aclass = '';
                }
                date_td.push(
                    <td key={'date_text' + date_text + x} onClick={() => { hide_calendar(year, month, (x + 1) - frist_week_first_day); props.bgChangeFromCalendar(year, month, (x + 1) - frist_week_first_day); changeSchedule(); }}>
                        <a href="/" className={Aclass} onClick={event => { event.preventDefault(); }}>{date_text++}</a>
                    </td>
                );
            }
        } else {
            for (let x = (tr_idx * 7); x < (tr_idx * 7) + 7; x++) {
                if ((x + 1) % 7 === 0) {
                    Aclass = 'saturday';
                } else if (x % 7 === 0) {
                    Aclass = 'sunday';
                } else {
                    Aclass = '';
                }
                if (date_text <= last_week_last_date) {
                    date_td.push(
                        <td key={'date_text' + date_text + x} onClick={() => { hide_calendar(year, month, (x + 1) - frist_week_first_day); props.bgChangeFromCalendar(year, month, (x + 1) - frist_week_first_day); changeSchedule(); }}>
                            <a href="/" className={Aclass} onClick={event => { event.preventDefault(); }}>{date_text++}</a>
                        </td>
                    );
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


    // 최초 렌더링 시에만 함수를 호출하여 초기값 설정후 출력
    useEffect(() => {
        set_print_year_month_date(year_month_date_printer(year_month_date_text));
        setChange_date(date_print(year_month_date_text[0], year_month_date_text[1] - 1));
    }, []);

    //업데이트
    useEffect(() => {
        set_print_year_month_date(year_month_date_printer(year_month_date_text));
        setChange_date(date_print(year_month_date_text[0], year_month_date_text[1] - 1));
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    }, [year_month_date_text]);

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