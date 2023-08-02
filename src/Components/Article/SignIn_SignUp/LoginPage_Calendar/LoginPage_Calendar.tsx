import React,{useState,useEffect} from 'react';
import '../../../../css/LoginPage_Calendar.css'

function LoginPage_Calendar() {
    //로그인 달력 요일
    const [LoginDays,setLoginDays] = useState<JSX.Element[]>([]) 
    const LoginCalendarDays =()=>{
        const days:string[] = ['일','월','화','수','목','금','토']
        const LoginDaysElement:JSX.Element[] = [];
        
        for(let x=0; x<days.length; x++){
            LoginDaysElement.push(
                <li key={'LoginDaysElement'+x}>{days[x]}</li>
            )
        }

        setLoginDays(LoginDaysElement);
    }

    //오늘 년도, 월, 일
    const [LoginYM,setLoginYM] = useState<JSX.Element[]>([])  
    const LoginTodayYM=()=>{
        const LoginYMElement:JSX.Element[] =[];
        const todaynewDate = new Date();
        const todayYear = todaynewDate.getFullYear();
        const todayMonth = todaynewDate.getMonth()+1;
        const todayarr:number[] = [todayYear,todayMonth];
        let YMtext:string = '년';

        for(let x=0; x<todayarr.length; x++){
            if(x===0){YMtext='년'}
            else{YMtext='월'}
            LoginYMElement.push(
                <div key={'LoginYM'+x}>{todayarr[x]}{YMtext}</div>
            )
        }

        setLoginYM(LoginYMElement);
    }

    //로그인 달력
    const [LoginCalendar,setLoginCalendar] = useState<JSX.Element[]>([]);
    const LoginTodayCalendar=()=>{
        const LoginCalendarLis:JSX.Element[][]=[];
        const LoginCalendarUls:JSX.Element[]=[];
        const Today:Date = new Date();
        const prevLastWeekLastDate:number = new Date(Today.getFullYear(),Today.getMonth(),0).getDate();
        const startWeekstartDay:number = new Date(`${Today.getFullYear()}-${Today.getMonth()+1}-1`).getDay();
        const lastWeeklastDate:number = new Date(Today.getFullYear(),Today.getMonth()+1,0).getDate()
        const Weeks:number = LoginWeeks(Today.getFullYear(), Today.getMonth()); //ul태그
        let prev_count_days:number=startWeekstartDay-1;
        let count_days:number = 0;
        let Lowten:string='';
        let next_count_days:number = 0;
        
        //lis 2차원배열 초기화
        for(let x=0; x<Weeks; x++){
            LoginCalendarLis[x]=[];
        }

        //달력 날짜 그리기
        for(let x=0; x<Weeks; x++){
            for(let y=(x*7); y<(x*7)+7; y++){
                if(y>=startWeekstartDay && y<(startWeekstartDay+lastWeeklastDate)){
                    count_days++;

                    //10 이하일때 앞에 0 붙여주기
                    if(count_days<10){Lowten='0'}
                    else{Lowten=''}

                    LoginCalendarLis[x].push(
                        <li key={'LoginCalendarLis'+y}>{Lowten}{count_days}</li>
                    )
                    console.log(count_days);
                }else{
                    if(x===0){
                        LoginCalendarLis[x].push(
                            <li key={'LoginCalendarLis'+y} className='prev_next'>{prevLastWeekLastDate - prev_count_days}</li>
                        )
                        prev_count_days--;
                    }else{
                        next_count_days++;

                        //10 이하일때 앞에 0 붙여주기
                        if(next_count_days<10){Lowten='0';}
                        else{Lowten='';}

                        LoginCalendarLis[x].push(
                            <li key={'LoginCalendarLis'+y} className='prev_next'>{Lowten}{next_count_days}</li>
                        )
                    }
                }
            }
        }

        for(let x=0; x<Weeks; x++){
            LoginCalendarUls.push(
                <ul key={`LoginCalendarUls${x}`}>
                    {LoginCalendarLis[x]}
                </ul>
            )
        }
        setLoginCalendar(LoginCalendarUls);
    }

    //해당 월에 몇주인지 구하기
    const LoginWeeks=(Year:number, Month:number):number=>{

        const start_day:number = new Date(`${Year}-${Month+1}-1`).getDay();
        const end_date:number = new Date(Year,Month+1,0).getDate();
        
        return Math.ceil((start_day+end_date)/7);
    }

    //마운트시 최초 실행
    useEffect(()=>{
        LoginTodayYM();
        LoginCalendarDays();
        LoginTodayCalendar();
    },[])
    return (
        <div id="LoginPage_Calendar_wrap" className='LoginPage_Calendar_wrap'>
            
            <div>
                <div id='LoginTodayYM' className='LoginTodayYM'>
                    {LoginYM}
                    <button>btn</button>
                </div>
                <ul className='LoginCalendarDays' id='LoginCalendarDays'>
                    {LoginDays}
                </ul>
                <div id='LoginCalendar' className='LoginCalendar'>
                    {LoginCalendar}
                </div>
            </div>

            
        </div>
    )
}

export default LoginPage_Calendar;