import './css/Contents.css'
import React,{useState, useEffect} from 'react';


type ContnetsProps = {
    title: string;
    desc: string;
    Mode: string;
    onChangeMode: (id:number) => void; // 예시로 빈 함수 타입 설정
  };

function Contents(props:ContnetsProps){
    /* 라이프 사이클 관련 */
    const executeFunctionBeforeRender=():void=>{
        const element: HTMLElement | null = document.getElementById('calendar');
        if(element){
            element.classList.add('hide');
        }

        props.onChangeMode(NaN);
    }
    
    /* 날짜 관련 */
    const calender_date :Date = new Date();
    const calender_day_index :number = calender_date.getDay();

    /* 요일 관련 */
    const calender_day :string[] = ['일','월','화','수','목','금','토']

    /* 화면 출력 */
    const day_list:JSX.Element[] = calender_day.map((days:string, index:number)=>{
        return <th key={index}>{days}</th>
    })

    //날짜 출력
    let [change_date,setChange_date] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setChange_date(date_print(calender_date.getFullYear(), calender_date.getMonth()));
    }, []); // 최초 렌더링 시에만 date_print 함수를 호출하여 데이터 설정

    function date_print(year:number, month:number):JSX.Element[]{
        localStorage.setItem('date_text','1'); // 날짜 세기위한 카운트
        localStorage.setItem('month_box_length','1');
        //현재 날짜의 1일의 요일 인덱스 ex(2023-07-01) => 토요일(index=6)
        const frist_week_first_day:number =new Date(year, month, 1).getDay();
        //현재 날짜의 마지막 일
        const last_week_last_date:number =new Date(year, month+1, 0).getDate();
        
        const date_tr:JSX.Element[] = [];
        const date_separat = date_separation(year,month);
        for(let x=0; x<date_separat; x++){
            date_tr.push(<tr key={'date_separat'+x}>{create_td(frist_week_first_day, last_week_last_date)}</tr>)
        }
        return date_tr;
    }

    /* 계산 함수들 */
    //해당 월이 몇주인지 계산(필요한 데이터: 연도, 월, 요일(인덱스))
    function date_separation(year:number, month:number):number{
        let week_calc = new Date(year,month,1);
        let month_last_date = new Date(year,month+1, 0);
        return Math.ceil((week_calc.getDay()+month_last_date.getDate())/7);
    }

    //td생성
    function create_td(frist_week_first_day:number, last_week_last_date:number):JSX.Element[]{
        const date_td:JSX.Element[] = [];
        let date_text:number =Number(localStorage.getItem('date_text')); //날짜
        let month_box_length =Number(localStorage.getItem('month_box_length'));
        let for_last_index=month_box_length+7;

            //날짜 텍스트 그리기
            for(let x=month_box_length; x<for_last_index; x++){
                if(month_box_length>frist_week_first_day && month_box_length<last_week_last_date+7){
                    date_td.push(
                        <td key={'date_text'+date_text} onClick={()=>{executeFunctionBeforeRender();}}>
                            <a href="/" onClick={event=>{event.preventDefault();}}>{date_text++}</a>
                        </td>);  
                }else{
                    date_td.push(<td key={'prev_month'+x+'_date'}></td>);
                }
                month_box_length++;
            }
            localStorage.setItem('date_text',`${date_text}`);
            localStorage.setItem('month_box_length',`${month_box_length}`);

        if(Number(localStorage.getItem('date_text'))==last_week_last_date){
            localStorage.removeItem('date_text');
            localStorage.removeItem('month_box_length');
        }
        return date_td;
    }
    return(
        <article>
            
            <div id="year_month_date" className='year_month_date'>
                <div id="year"></div>
                <div id="month"></div>
                <div id="date"></div>
            </div>
        
            <div id="calendar" className='calendar'>
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
            </div>
        </article>
    )
}

export default Contents;