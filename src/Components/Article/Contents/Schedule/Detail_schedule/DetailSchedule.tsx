import React,{ useState,useEffect} from "react";
import '../../../../../css/DetailSchedule.css'
import { db } from '../../../../../firebase';
import { ref, get } from 'firebase/database';
type DetailScheduleProps={
    detailPlanListIndex:number;
}

type printDOM={
    content:string,
    date:string,
    id:number,
    time:string,
    title:string
}

function DetailSchedule(props:DetailScheduleProps){
const [DetailSchedule_class,setDetailSchedule] = useState<string>('DetailSchedule'); //클래스 입히기
const [savePlanIndex,setsavePlanIndex] = useState<number>(NaN) //
const [today_infomaition, setToday_infomaition] = useState<JSX.Element[]>([]);

    
    useEffect(()=>{
        let save_UID:any = sessionStorage.getItem('userUID'); //firebase의 데이터 저장하는 경로이름

        if(save_UID!==null){
            const dataRef = ref(db, save_UID); // 경로를 지정합니다.
            get(dataRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        console.log('Data found: ',data[props.detailPlanListIndex]);
                        setTimeout(()=>{
                            setDetailSchedule('DetailSchedule show')
                        },100)
                    } else {
                        console.log('firebase 경로 확인 필요');
                    }
                })
                .catch((error) => {
                    console.error('에러 내용: ', error);
            });
        }else{//test용임 
            const dataRef = ref(db, 'test'); // 경로를 지정합니다.
            get(dataRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        printDOM(data[props.detailPlanListIndex]);
                        setTimeout(()=>{
                            setDetailSchedule('DetailSchedule show')
                        },100)
                    } else {
                        console.log('firebase 경로 확인 필요');
                    }
                })
                .catch((error) => {
                    console.error('에러 내용: ', error);
            });
        }
        
    },[props.detailPlanListIndex])

    const printDOM=(DomEle:printDOM):void=>{
        let plan_title:string[]=['일정 제목', '일정 내용', '일정 날짜', '일정 시간'];
        let plan_content:string[]=[DomEle.title, DomEle.content, DomEle.date, DomEle.time];

        let todayinfo_local:JSX.Element[]=[];

        for(let x=0; x<4; x++){
            todayinfo_local.push(
                <li key={'todayplanlistlis'+x}>
                    <h4>{plan_title[x]}</h4>
                    <p>{plan_content[x]}</p>
                </li>
            )
        }

        setToday_infomaition(todayinfo_local);
    }
    
    return(
        <div id="DetailSchedule" className={DetailSchedule_class}>
            <h3>자세한 일정</h3>
            <div id="DetailPlanWrap" className="DetailPlanWrap">
                <div id="DetailPlan" className="DetailPlan">
                    <ul>
                        {today_infomaition}
                    </ul>
                </div>

                <div id="DetaileTimeLine" className="DetaileTimeLine">
                    <div>
                        <p>00</p>
                        <div></div>
                    </div>
                    <div>
                        <p>01</p>
                        
                    </div>
                    <div>
                        <p>02</p>
                    </div>
                    <div>
                        <p>03</p>
                        
                    </div>
                    <div>
                        <p>04</p>
                        
                    </div>
                    <div>
                        <p>05</p>
                    </div>
                    <div>
                        <p>06</p>
                        
                    </div>
                    <div>
                        <p>07</p>
                    </div>
                    <div>
                        <p>08</p>
                        
                    </div>
                    <div>
                        <p>09</p>
                        
                    </div>
                    <div>
                        <p>10</p>
                        
                    </div>
                    <div>
                        <p>11</p>
                        
                    </div>
                    <div>
                        <p>12</p>
                        
                    </div>
                    <div>
                        <p>13</p>
                        <div></div>
                    </div>
                    <div>
                        <p>14</p>
                        
                    </div>
                    <div>
                        <p>15</p>
                        
                    </div>
                    <div>
                        <p>16</p>
                        
                    </div>
                    <div>
                        <p>17</p>
                        
                    </div>
                    <div>
                        <p>18</p>
                        
                    </div>
                    <div>
                        <p>19</p>
                        
                    </div>
                    <div>
                        <p>20</p>
                        
                    </div>
                    <div>
                        <p>21</p>
                        <div></div>
                    </div>
                    <div>
                        <p>22</p>
                        
                    </div>
                    <div>
                        <p>23</p>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSchedule;