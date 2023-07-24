import React,{useState, useEffect} from "react";
import '../../../../../css/ScheduleList.css'

type Schedule_list_props={
    ChangeplanMode(mode:string):void;
}
function ScheduleList(props:Schedule_list_props){

    //추후에 firebase를 넣을때 추가해야함
    const [PlanList,setPlanList] = useState<JSX.Element[]>([]);
    const [pagingBtn_List,setpagingBtn_List] = useState<JSX.Element[]>([]);

    //현재 for문은 임시임
    const addPlanList=()=>{
        let list_arr:JSX.Element[] = [];
        for(let x=0; x<5; x++){
            list_arr.push(
                <li key={'planList'+x}>
                    <a href="/" onClick={(e:React.MouseEvent<HTMLAnchorElement>)=>{e.preventDefault();}}>
                        dsafdsa
                    </a>
                    <button><i className="fa-solid fa-trash"></i></button>
                </li>
            );
        }
        setPlanList(list_arr);
    }

    //목록에 따라 변경되는 페이징 버튼 개수
    const settingPagingBtn=()=>{
        let paginbtnNumber=Math.ceil(PlanList.length/5);
        let paginbtnWrap:JSX.Element[] = [];
        for(let x=0; x<paginbtnNumber; x++){
            paginbtnWrap.push(
                <a key={'pagingBtn'+x+`${x/x+1}`} href="/" onClick={(event:React.MouseEvent<HTMLAnchorElement>)=>{event.preventDefault();}}>
                    {x+1}
                </a>
            );
        }
        setpagingBtn_List(paginbtnWrap);
    }

    useEffect(()=>{
        addPlanList();
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
            <button type="button" onClick={()=>{props.ChangeplanMode('CREATE')}}>일정 추가</button>
        </div>
    </div>
    )
}

export default ScheduleList