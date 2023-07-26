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
        console.log(DomEle);
    }
    
    return(
        <div id="DetailSchedule" className={DetailSchedule_class}>
            <h3>자세한 일정</h3>
            <div id="DetailPlanWrap" className="DetailPlanWrap">
                <div id="DetailPlan" className="DetailPlan">

                </div>

                <div id="DetaileTimeLine" className="DetaileTimeLine">

                </div>
            </div>
        </div>
    )
}

export default DetailSchedule;