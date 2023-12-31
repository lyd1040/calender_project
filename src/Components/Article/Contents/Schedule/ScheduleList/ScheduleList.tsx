import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../../../../css/ScheduleList.css'

type Schedule_list_props = {
    show_hide_Datail_plan_OnOff(OnOff: boolean, dataIndex: number): void;
    ChangeplanMode(mode: string): void;
    onDeleteList(deleteIndex: number): void;
    planList: planListType[];
    ScheduleWidthClass:boolean;
    save_Update_Index(Update_Index: number): void;
}
type planListType = {
    id: number,
    title: string,
    content: string,
    date: string,
    time: string
}

function ScheduleList(props: Schedule_list_props) {
    const Navigate = useNavigate();

    const [MediaWidthClass,setMediaWidthClass] = useState<string>('');
    const [PlanList, setPlanList] = useState<JSX.Element[]>([]);
    const [pagingBtn_List, setpagingBtn_List] = useState<JSX.Element[]>([]);

    const addPlanList = (startNum: number): void => {
        let list_arr: JSX.Element[] = [];
        let save_pagingBtn_number: number = Math.ceil(props.planList.length / 5)
        if (props.planList.length !== 0) {
            if (startNum !== save_pagingBtn_number) {
                for (let x = (startNum * 5) - 5; x < (startNum * 5); x++) {
                    list_arr.push(
                        <li key={'planList' + x}>
                            <a href="/" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); props.show_hide_Datail_plan_OnOff(true, x); }}>
                                {props.planList[x].title}
                            </a>
                            <div>
                                <button type="button" onClick={() => { props.ChangeplanMode('UPDATE'); props.save_Update_Index(props.planList[x].id) }}><i className="fa-solid fa-pen-nib"></i></button>
                                <button onClick={() => { props.onDeleteList(props.planList[x].id) }}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </li>
                    );
                }
            } else {
                for (let x = ((startNum * 5) - 5); x < props.planList.length; x++) {
                    list_arr.push(
                        <li key={'planList' + x}>
                            <a href="/" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); props.show_hide_Datail_plan_OnOff(true, x); }}>
                                {props.planList[x].title}
                            </a>
                            <div>
                                <button type="button" onClick={() => { props.ChangeplanMode('UPDATE'); props.save_Update_Index(props.planList[x].id) }}><i className="fa-solid fa-pen-nib"></i></button>
                                <button onClick={() => { props.onDeleteList(props.planList[x].id) }}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </li>
                    );
                }
            }
        } else {
            list_arr.push(<p>내용이 없습니다.</p>)
        }

        setPlanList(list_arr);
    }

    //목록에 따라 변경되는 페이징 버튼 개수
    const settingPagingBtn = () => {
        let paginbtnNumber = Math.ceil(props.planList.length / 5);
        let paginbtnWrap: JSX.Element[] = [];
        for (let x = 0; x < paginbtnNumber; x++) {
            paginbtnWrap.push(
                <a key={'pagingBtn' + x + x} href="/" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); addPlanList(x + 1) }}>
                    {x + 1}
                </a>
            );
        }
        setpagingBtn_List(paginbtnWrap);
    }

    //로그인 여부
    const LoginChecking = () =>{
        if(window.sessionStorage.getItem('userUID')===null){
            alert('로그인이 되어있지 않습니다.');
            Navigate('/Calendar/SignIn_SignUp');
        }else{
            props.ChangeplanMode('CREATE'); 
        }
    }

    useEffect(() => {
        addPlanList(1);
    }, [props.planList])

    useEffect(() => {
        settingPagingBtn();
    }, [PlanList, props.planList])

    useEffect(()=>{
        if(props.ScheduleWidthClass===true){
            setMediaWidthClass('MediaWidth');
        }else{
            setMediaWidthClass('');
        }
    },[props.ScheduleWidthClass])

    return (
        <div className={`plan_list_wrap ${MediaWidthClass}`}>
            <h3>일정목록</h3>

            <ul className="plan_list">
                {PlanList}
            </ul>

            <div className="Schedule_btnWrap">
                <div className="pagingBtn_wrap">
                    {pagingBtn_List}
                </div>
                <button type="button" className="Schedule_btn" onClick={() => { LoginChecking(); }}>일정 추가</button>
            </div>
        </div>
    )
}

export default ScheduleList