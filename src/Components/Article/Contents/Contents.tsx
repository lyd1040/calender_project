import React, { useEffect, useState } from "react";
import '../../../css/Contents.css';
import Calendar from './Calendar/Calendar';
import Schedule from './Schedule/Schedule';

type ContnetsProps = {
    title: string;
    desc: string;
    Mode: string;
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
    useEffect(() => {
        setScheduleComponents(null);
    }, [])

    // showHideSchedule 바꿔주는 함수
    function changeSchedule() {
        setShowHideSchedule(!showHideSchedule);
    }


    return (
        <section className="Contents" id="Contents">
            <Calendar onChangeMode={onChangeMode} onChangeMode2={props.onChangeMode2} title={props.title} desc={props.desc} Mode={props.Mode} changeSchedule={changeSchedule}></Calendar>
            {Schedule_Components}
        </section>
    )
}

export default Contents;