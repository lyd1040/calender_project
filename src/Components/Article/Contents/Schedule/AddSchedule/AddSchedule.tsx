import React,{useState, useEffect} from "react";
import '../../../../../css/AddSchedule.css'

type AddSchedule_props={
    ChangeplanMode(mode:string):void;
}

function AddSchedule(props:AddSchedule_props){

    const ChangeplanMode = (mode:string) =>{
        props.ChangeplanMode(mode);
    }
    return(
        <div id="AddSchedule" className="AddSchedule">
            <h3>일정추가</h3> 
            <button className="cancleBtn" onClick={()=>{ChangeplanMode('READ')}}><i className="fa-solid fa-x"></i></button>
            <div className="AddSchedule_center">
                
                
                <form action="">
                    <div><label htmlFor="">제목</label><input type="text" /></div>
                    <div><label htmlFor="">내용</label><textarea /></div>
                    <div><label htmlFor="">날짜</label><input type="date" />
                    <label htmlFor="">~</label><input type="date" /></div>
                    <div><label htmlFor="">시간</label><input type="time" />
                    <label htmlFor="">~</label><input type="time" /></div>
                </form>
            </div>
            <div className="Schedule_btnWrap">
                <button type="button" onClick={()=>{ChangeplanMode('READ')}}>일정 추가</button>
            </div>
        </div>
    )
}

export default AddSchedule;