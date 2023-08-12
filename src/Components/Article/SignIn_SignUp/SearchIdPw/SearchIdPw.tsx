import React, { useState, useEffect, useRef } from "react";
import '../../../../css/SearchIdPw.css'
import { auth, fbdb } from '../../../../firebase';
import {collection, getDocs, doc, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import {sendPasswordResetEmail} from 'firebase/auth';
type SearchIdPwType = {
    showSignUpFunction: (CHSG: string) => void;
    SignIn_SignUp_class: string;
}

// 아이디 비밀번호 찾기 그리기
function SearchIdPw(props: SearchIdPwType) {
    const form:any = useRef();

    let [notSelect, setNotSelect] = useState<string>('');
    const [SearchContents, setSearchContents] = useState<JSX.Element[]>([]);

    //아이디찾기 비밀번호 찾기 바꾸기
    let [SearchFilterIDPW, setSearchFilterIDPW] = useState<string>('FilterIDSearch');
    const ChangeSearchContentsMode=(Contents_name:string)=>{
        setSearchFilterIDPW(Contents_name);
    }
    
    const ChangeSearchContents =()=>{
        const SaveSearchContents:JSX.Element[] = [];
        const SearchIdPw_input_wrap:HTMLDivElement = document.getElementById('SearchIdPw_input_wrap') as HTMLDivElement;
        const SearchName:string[] = ['아이디','이름','생년월일'];
        const SearchId:string[] =['Id','Name','Birth'];
        let start_forNumber=1;

        if(SearchIdPw_input_wrap.classList.contains('FilterIDSearch')){
            start_forNumber=1;
        }else if(SearchIdPw_input_wrap.classList.contains('FilterPWSearch')){
            start_forNumber=0;
        }else{
            console.log('nothing');
        }

        for(let x=start_forNumber; x<SearchName.length; x++){
            SaveSearchContents.push(
                <div key={'SaveSearchContents'+x}><label htmlFor={`Search${SearchId[x]}_input`}>{SearchName[x]}</label><input type="text" id={`Search${SearchId[x]}_input`} /></div>
            )
        }
        setSearchContents(SaveSearchContents);
    }

    //확인버튼 누를시
    const SearchIDPWCheckFunction= async()=>{
        try{
            const UserInfoArray: DocumentData[] =[];
            const snapshot = await getDocs(collection(fbdb,'UserInfomation'));
            snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>)=>{
                UserInfoArray.push(doc.data());
            })

            if(SearchContents.length === 2){
                CheckSearchID(UserInfoArray);
            }else{
                CheckSearchPW(UserInfoArray);
            }
        }
        catch(error:any){
            console.log(error);
        }

    }
    //아이디 찾기
    const CheckSearchID=(UserInfoArray: DocumentData[])=>{
        //UserInfoArray = Firebase에 유저의 전체 Data
        const inputtag:HTMLInputElement[] = document.querySelectorAll('.SearchIdPw_input_wrap input') as unknown as HTMLInputElement[];


        for(let x=0; x<UserInfoArray.length; x++){
            if(UserInfoArray[x].userName === inputtag[0].value && UserInfoArray[x].userBirth === inputtag[1].value){
                let ID = UserInfoArray[x].userID.split('@')[0];
                let showID = ID.split('').splice(0, Math.floor(ID.length/2));
                let hideID = ID.split('').splice(Math.floor(ID.length/2) , ID.length);
                let mail = UserInfoArray[x].userID.split('@')[1];

                
                for(let y=0; y<hideID.length; y++){
                    showID.push('*');
                }
                showID=showID.join('');

                alert(`입력하신 정보의 아이디는${showID +'@'+ mail}입니다.`);
                break;
            }
        }
    }

    //비밀번호 찾기
    const CheckSearchPW=async(UserInfoArray: DocumentData[])=>{
        //UserInfoArray = Firebase에 유저의 전체 Data
        const inputtag:HTMLInputElement[] = document.querySelectorAll('.SearchIdPw_input_wrap input') as unknown as HTMLInputElement[];
        for(let x=0; x<UserInfoArray.length; x++){
            if(UserInfoArray[x].userID === inputtag[0].value && UserInfoArray[x].userName === inputtag[1].value && UserInfoArray[x].userBirth === inputtag[2].value){
                try {
                    await sendPasswordResetEmail(auth, inputtag[0].value);
                    alert('비밀번호 재설정 이메일을 보냈습니다.')
                  } catch (error) {
                    console.error('비밀번호 재설정 이메일 발송 에러:', error);
                    alert('비밀번호 재설정 이메일 발송에 실패했습니다.');
                  }
                break;
            }
        }
    }

    //아이디찾기, 비밀번호 찾기 태그 클릭했을때 active 클래스 추가
    const onClickedAddClass = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        const searchBtns:HTMLAnchorElement[] = document.querySelectorAll('#SearchIdPw #SearchBtn_wrap a') as unknown as HTMLAnchorElement[];
        const targetElement = event.target as HTMLElement;
        for(let x=0; x<searchBtns.length; x++){
            searchBtns[x].classList.remove('active');
        }
        targetElement.classList.add('active');
    }


    //Tab 막기
    const visibility = () => {
        if (props.SignIn_SignUp_class === 'searchIdPw') {
            setNotSelect('');
        } else {
            setTimeout(() => {
                setNotSelect('VSB');
            }, 500);
        }
    }

    //업데이트
    useEffect(() => {
        visibility();
    }, [props.SignIn_SignUp_class])

    useEffect(()=>{
        ChangeSearchContents();
    },[SearchFilterIDPW])
    return (
        <div id="SearchIdPw" className={`SearchIdPw ${notSelect}`}>
            <div id="SearchIdPw_contents_wrap" className="SearchIdPw_contents_wrap">
                <div id="SearchBtn_wrap" className="SearchBtn_wrap">
                    <h2><a href="/" className="active" onClick={(event) =>{event.preventDefault(); ChangeSearchContentsMode('FilterIDSearch'); onClickedAddClass(event);}}>아이디 찾기</a></h2>
                    <h2><a href="/" onClick={(event) =>{event.preventDefault(); ChangeSearchContentsMode('FilterPWSearch'); onClickedAddClass(event);}}>비밀번호 찾기</a></h2>
                </div>
                
                <form action="" method="post">
                    <div id="SearchIdPw_input_wrap" className={`SearchIdPw_input_wrap ${SearchFilterIDPW}`}>
                        {SearchContents}
                    </div>
                    <div id="CheckPrevBtn_wrap" className="CheckPrevBtn_wrap">
                        <a href="/" onClick={(event) => { event.preventDefault(); props.showSignUpFunction('') }}>이전</a>
                        <a href="/" onClick={(event) => { event.preventDefault();  SearchIDPWCheckFunction();}}>확인</a>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default SearchIdPw;