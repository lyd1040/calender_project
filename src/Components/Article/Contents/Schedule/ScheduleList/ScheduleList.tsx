import React,{useState, useEffect} from "react";
import '../../../../../css/ScheduleList.css'

type Schedule_list_props={
    show_hide_Datail_plan_OnOff(OnOff:boolean, dataIndex:number):void;
    ChangeplanMode(mode:string):void;
    planList:planListType[];
}
type planListType ={
    id:number,
    title:string,
    content:string,
    date:string,
    time:string
}

function ScheduleList(props:Schedule_list_props){

    const [PlanList,setPlanList] = useState<JSX.Element[]>([]);
    const [pagingBtn_List,setpagingBtn_List] = useState<JSX.Element[]>([]);

    const addPlanList=(startNum:number):void=>{
        let list_arr:JSX.Element[] = [];
        let save_pagingBtn_number:number=Math.ceil(props.planList.length/5)

        if(startNum!==save_pagingBtn_number){
            for(let x=(startNum*5)-5; x<(startNum*5); x++){
                list_arr.push(
                    <li key={'planList'+x}>
                        <a href="/" onClick={(e:React.MouseEvent<HTMLAnchorElement>)=>{e.preventDefault(); props.show_hide_Datail_plan_OnOff(true,x);}}>
                            {props.planList[x].title}
                        </a>
                        <div>
                            <button><i className="fa-solid fa-pen-nib"></i></button>
                            <button><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </li>
                );
                console.log(props.planList);
            }
        }else{
            for(let x=((startNum*5)-5); x<props.planList.length; x++){
                list_arr.push(
                    <li key={'planList'+x}>
                        <a href="/" onClick={(e:React.MouseEvent<HTMLAnchorElement>)=>{e.preventDefault(); props.show_hide_Datail_plan_OnOff(true,x);}}>
                            {props.planList[x].title}
                        </a>
                        <div>
                            <button><i className="fa-solid fa-pen-nib"></i></button>
                            <button><i className="fa-solid fa-trash"></i></button>
                        </div>
                        </li>
                );
            }
        }

        setPlanList(list_arr);
    }

    //목록에 따라 변경되는 페이징 버튼 개수
    const settingPagingBtn=()=>{
        let paginbtnNumber=Math.ceil(props.planList.length/5);
        let paginbtnWrap:JSX.Element[] = [];
        for(let x=0; x<paginbtnNumber; x++){
            paginbtnWrap.push(
                <a key={'pagingBtn'+x+`${x/x+1}`} href="/" onClick={(event:React.MouseEvent<HTMLAnchorElement>)=>{event.preventDefault(); addPlanList(x+1)}}>
                    {x+1}
                </a>
            );
        }
        setpagingBtn_List(paginbtnWrap);
    }

    useEffect(()=>{
        addPlanList(1);
    },[])

    useEffect(()=>{
        settingPagingBtn();
    },[PlanList])

    return(
    <div className="plan_list_wrap">
        <h3>일정목록</h3>
        
        <ul className="plan_list">
            {PlanList}
        </ul>

        {/* <p className="not_plan">
            일정이 없습니다.
        </p> */}

        <div className="Schedule_btnWrap">
            <div className="pagingBtn_wrap">
                {pagingBtn_List}
            </div>
            <button type="button" className="Schedule_btn" onClick={()=>{props.ChangeplanMode('CREATE')}}>일정 추가</button>
        </div>
    </div>
    )
}

export default ScheduleList