import React, { useState, useEffect } from "react";
import '../../../../../css/DetailSchedule.css'
type DetailScheduleProps = {
    planList: printDOM[];
    detailPlanListIndex: number;
    Schedule_date_test: Schedule_date_test_type;
}

type printDOM = {
    content: string,
    date: string,
    id: number,
    time: string,
    title: string
}

type Schedule_date_test_type = {
    year: number;
    month: number;
    date_text: number;
}

function DetailSchedule(props: DetailScheduleProps) {
    const [DetailSchedule_class, setDetailSchedule] = useState<string>('DetailSchedule'); //클래스 입히기
    const [today_infomaition, setToday_infomaition] = useState<JSX.Element[]>([]);
    const [DetaileTimeLine_list, setDetaileTimeLine_list] = useState<JSX.Element[]>([]);


    useEffect(() => {
        printDOM(props.planList[props.detailPlanListIndex]);
        printTodayDom();
        setTimeout(() => {
            setDetailSchedule('DetailSchedule show')
        }, 100)

    }, [props.detailPlanListIndex, props.planList])

    const printDOM = (DomEle: printDOM): void => {
        let plan_title: string[] = ['일정 제목', '일정 내용', '일정 날짜', '일정 시간'];
        let plan_content: string[] = [DomEle.title, DomEle.content, DomEle.date, DomEle.time];

        let todayinfo_local: JSX.Element[] = [];

        for (let x = 0; x < 4; x++) {
            todayinfo_local.push(
                <li key={'todayplanlistlis' + x}>
                    <h4>{plan_title[x]}</h4>
                    <p>{plan_content[x]}</p>
                </li>
            )
        }

        setToday_infomaition(todayinfo_local);
    }

    const printTodayDom = () => {
        let time_hours: string[] = []; // #DetaileTimeLine 시간표현
        let list_hours: JSX.Element[][] = []; // #DetaileTimeLine 리스트표현
        let TimeLine_list: JSX.Element[] = [];


        //시간 표현
        for (let x = 0; x < 24; x++) {
            if (x < 10) {
                time_hours.push(`0${x}`);
            } else {
                time_hours.push(x.toString());
            }
        }

        // list_hours 배열의 내부 배열 초기화
        for (let x = 0; x < 24; x++) {
            list_hours.push([]); // 각 요소에 빈 배열을 추가하여 초기화
        }

        for (let x = 0; x < props.planList.length; x++) {
            let firstTime = props.planList[x].time.split(' ~ ')[0];
            let secoundTime = props.planList[x].time.split(' ~ ')[1];
            for (let y = 0; y < 24; y++) {
                if (Number(firstTime.split(':')[0]) <= Number(time_hours[y]) && Number(time_hours[y]) <= Number(secoundTime.split(':')[0])) {
                    list_hours[y].push(<div key={`propsPlanList${x}${y}`} className="Dshow">{props.planList[x].title}</div>)
                }
            }
        }


        for (let x = 0; x < 24; x++) {
            TimeLine_list.push(
                <div key={`TimeLine${x}`}>
                    <p>{time_hours[x]}</p>
                    <div className="Dshow_wrap">
                        {list_hours[x]}
                    </div>
                </div>
            )
        }

        setDetaileTimeLine_list(TimeLine_list)
    }

    return (
        <div id="DetailSchedule" className={DetailSchedule_class}>
            <h3>자세한 일정</h3>
            <div id="DetailPlanWrap" className="DetailPlanWrap">
                <div id="DetailPlan" className="DetailPlan">
                    <ul>
                        {today_infomaition}
                    </ul>
                </div>

                <div id="DetaileTimeLine" className="DetaileTimeLine">
                    {DetaileTimeLine_list}
                </div>
            </div>
        </div>
    )
}

export default DetailSchedule;