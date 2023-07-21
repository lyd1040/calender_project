import './css/Contents.css'
import React,{useState} from 'react';

type ContnetsProps= {
    title: string;
    desc: string;
}

function Contents(props:ContnetsProps){
    
    /* 날짜 관련 */
    const calender_date :Date = new Date();
    const calender_day_index :number = calender_date.getDay();
    
    console.log(new Date(2023,9,0).getDate());

    /* 요일 관련 */
    const calender_day :string[] = ['일','월','화','수','목','금','토']
    console.log(calender_date);


    /* 화면 출력 */
    const day_list:JSX.Element[] = calender_day.map((days:string, index:number)=>{
        return <th key={index}>{days}</th>
    })

    //날짜 출력
    let [change_date,setChange_date] = useState<JSX.Element[]>(date_print(calender_date.getFullYear(),calender_date.getMonth()));
    function date_print(year:number, month:number):JSX.Element[]{
        //현재 날짜의 1일의 요일 인덱스 ex(2023-07-01) => 토요일(index=6)
        const frist_week_first_day:number =new Date(year, month, 1).getDay();
        //현재 날짜의 마지막 요일
        const last_week_last_date:number =new Date(year, month+1, 0).getDate();
/* 
        const date_list = calender_day.map((days:string, index:number)=>{
            return <th key={index}>{days}</th>
        }) */

        for(let x=0; x<last_week_last_date; x++){

        }
        /* return date_list; */
    }
    //해당 월이 몇주인지 계산
    function date_separation(){

    }

    return(
        <article>
            {/* 
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
 */}
            <table>
                <thead>
                    <tr>
                        {day_list}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {change_date}
                    </tr>
                </tbody>
            </table>
        </article>
    )
}

export default Contents;