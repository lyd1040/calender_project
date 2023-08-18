import React, { useEffect, useState } from "react";
import '../../../css/Contents.css';
import Calendar from './Calendar/Calendar';
import Schedule from './Schedule/Schedule';
import BackgroundAni from "./BackgroundAni/BackgroundAni";
import Loading from "./Loading/Loading";

type ContnetsProps = {
    Mode: string;
    header_YMD: number[];
    onChangeMode2: (id: number) => void
    onChangeMode: (id: number, year?: number, month?: number, date_text?: number) => void;
};

type Schedule_date_test_type = {
    year: number;
    month: number;
    date_text: number;
}

function Contents(props: ContnetsProps) {
    const [LoadState, setLoadState] = useState<boolean>(false);
    const [showHideSchedule, setShowHideSchedule] = useState<boolean>(false);
    const [LoadingElement, setLoadingElement] = useState<JSX.Element | null>(null);
    const [Schedule_Components, setScheduleComponents] = useState<JSX.Element | null>(null);
    const [Schedule_date_test, set_Schedule_date_test] = useState<Schedule_date_test_type>({
        year: NaN,
        month: NaN,
        date_text: NaN,
    })
    const [BackgroundElement, setBackgroundElement] = useState<JSX.Element>()
    /* 
        const onChangeMode = (id: number, year: number, month: number, date_text: number): void => {
            set_Schedule_date_test({ year: year, month: month, date_text: date_text });
            props.onChangeMode(id, year, month, date_text)
        }
     */

    const bgChangeFromCalendar = (year: number, month: number, date_text: number) => {
        set_Schedule_date_test({ year: year, month: month, date_text: date_text });
    }

    // showHideSchedule 바꿔주는 함수
    const changeSchedule = () => {
        setShowHideSchedule(!showHideSchedule);
    }

    //Gnb 감추기
    const headerCheck = () => {
        const gnb: Element | null = document.querySelector('.gnbul');

        if (gnb) {
            gnb.classList.remove('show');
        }
    }

    const updateLading = (state: boolean) => {
        setLoadState(state);
    }


    useEffect(() => {
        headerCheck();
        setBackgroundElement(<BackgroundAni header_YMD={props.header_YMD} Schedule_date_test={Schedule_date_test}></BackgroundAni>);
        setScheduleComponents(null);
    }, [])

    useEffect(() => {
        set_Schedule_date_test({
            year: props.header_YMD[0],
            month: props.header_YMD[1],
            date_text: props.header_YMD[2]
        })
    }, [props.header_YMD])

    //바뀔시 스케쥴 화면에 출력
    useEffect(() => {
        if (showHideSchedule === true) {
            setTimeout(() => {
                setScheduleComponents(<Schedule SHclass={showHideSchedule} Schedule_date_test={Schedule_date_test}></Schedule>)
            }, 300)
        } else {
            setScheduleComponents(null);
        }
    }, [showHideSchedule, Schedule_date_test])

    useEffect(() => {
        if (showHideSchedule === true) {
            setScheduleComponents(<Schedule SHclass={showHideSchedule} Schedule_date_test={Schedule_date_test}></Schedule>)
            setBackgroundElement(<BackgroundAni header_YMD={props.header_YMD} Schedule_date_test={Schedule_date_test}></BackgroundAni>);
        }
    }, [Schedule_date_test])

    useEffect(() => {
        if (LoadState) {
            setLoadingElement(<Loading></Loading>)
        } else {
            setLoadingElement(null);
        }
    }, [LoadState])
    return (
        <section className="Contents" id="Contents">
            {BackgroundElement}
            <Calendar updateLading={updateLading} showHideSchedule={showHideSchedule} onChangeMode={props.onChangeMode} bgChangeFromCalendar={bgChangeFromCalendar} onChangeMode2={props.onChangeMode2} Mode={props.Mode} changeSchedule={changeSchedule}></Calendar>
            {Schedule_Components}
            {LoadingElement}
        </section>
    )
}

export default Contents;