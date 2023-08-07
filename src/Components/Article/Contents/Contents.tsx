import React, { useEffect, useState } from "react";
import '../../../css/Contents.css';
import Calendar from './Calendar/Calendar';
import Schedule from './Schedule/Schedule';

type ContnetsProps = {
    title: string;
    desc: string;
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
    const [showHideSchedule, setShowHideSchedule] = useState<boolean>(false);
    const [Schedule_Components, setScheduleComponents] = useState<JSX.Element | null>(null);
    const [Schedule_date_test, set_Schedule_date_test] = useState<Schedule_date_test_type>({
        year: NaN,
        month: NaN,
        date_text: NaN,
    })

    const onChangeMode = (id: number, year: number, month: number, date_text: number): void => {
        set_Schedule_date_test({ year: year, month: month, date_text: date_text });
        props.onChangeMode(id, year, month, date_text)
    }

    // showHideSchedule 바꿔주는 함수
    function changeSchedule() {
        setShowHideSchedule(!showHideSchedule);
    }


    useEffect(() => {
        setScheduleComponents(null);
    }, [])

    useEffect(() => {
        console.log(props.header_YMD);
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
    }, [showHideSchedule])



    return (
        <section className="Contents" id="Contents">
            <Calendar onChangeMode={onChangeMode} onChangeMode2={props.onChangeMode2} title={props.title} desc={props.desc} Mode={props.Mode} changeSchedule={changeSchedule}></Calendar>
            {Schedule_Components}
        </section>
    )
}

export default Contents;