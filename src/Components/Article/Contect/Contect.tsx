import React, { useState, useEffect } from "react";
import '../../../css/Contect.css'
import { fbdb } from '../../../firebase';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'

function Contect() {
    const navigate = useNavigate();

    const [label_input_element, setLabel_input_element] = useState<JSX.Element[]>([<></>]);
    const draw_Contect_input_label = async (): Promise<void> => {
        const label_input_element_array: JSX.Element[] = [];
        const draw_label_text: string[] = ['이름', '이메일'];
        const draw_input_id: string[] = ['NickName', 'NickNameEamil'];


        for (let x = 0; x < draw_label_text.length; x++) {
            label_input_element_array.push(
                <div>
                    <label htmlFor={draw_input_id[x]} className={draw_input_id[x]}>{draw_label_text[x]}</label>
                    <input type="text" id={draw_input_id[x]} required
                        onFocus={(event) => {
                            const thislabel: HTMLLabelElement = document.querySelector(`.${draw_input_id[x]}`) as HTMLLabelElement;
                            thislabel.classList.add('active');

                            event.target.addEventListener('focusout', () => {
                                if (event.target.value.length === 0) {
                                    thislabel.classList.remove('active');
                                }
                            })
                        }
                        } />
                </div>
            )
        }
        setLabel_input_element(label_input_element_array);
    }

    const sendContectContents = async (): Promise<void | boolean> => {
        const NickName: HTMLInputElement = document.getElementById('NickName') as HTMLInputElement;
        const NickNameEamil: HTMLInputElement = document.getElementById('NickNameEamil') as HTMLInputElement;
        const Contents: HTMLTextAreaElement = document.getElementById('ContectContents') as HTMLTextAreaElement;

        if (NickName && NickNameEamil && Contents) {
            try {
                if (await ContectValidation(NickName.value) === false) { return false }
                if (await ContectEmail(NickNameEamil.value) === false) { return false }
                if (await ContectContents(Contents.value) === false) { return false }

                await addDoc(collection(fbdb, "Contect"), {
                    Content: Contents.value,
                    Email: NickNameEamil.value,
                    Nickname: NickName.value
                });

                alert('정상적으로 문의되었습니다.');
            }
            catch (error: any) {
                console.log(error);
            }
        }
    }

    //닉네임 필수입력 검사
    const ContectValidation = async (ele: string): Promise<boolean> => {
        if (ele.length !== 0) {
            return true;
        } else {
            alert('이름은 필수 입력 항목입니다.');
        }
        return false;
    }

    //이메일 필수입력 검사
    const ContectEmail = async (ele: string): Promise<boolean> => {
        const emailValidation: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        //이메일은 수정필요
        if (emailValidation.test(ele)) {
            console.log(ele);
        } else {
            alert('이메일 형식이 올바르지 않습니다.');
        }
        return false;
    }

    //컨텐츠 필수입력검사
    const ContectContents = async (ele: string): Promise<boolean> => {
        if (ele.length !== 0) {
            return true;
        } else {
            alert('문의사항은 필수 입력 항목입니다.');
        }
        return false;
    }

    const headerCheck = () => {
        const gnb: Element | null = document.querySelector('.gnbul');

        if (gnb) {
            gnb.classList.remove('show');
        }
    }

    useEffect(() => {
        headerCheck();
        draw_Contect_input_label();
    }, [])
    return (
        <div id="Contect" className="Contect">

            <form action="" method="post">
                <h2>문의하기</h2>
                <div id="writeinfo" className="writeinfo">
                    {label_input_element}
                </div>

                <div>
                    <textarea name="ContectContents" id="ContectContents" className="ContectContents" placeholder="문의내용" required></textarea>
                </div>

                <div id="btn_wrap">
                    <div>
                        <button type="button" onClick={() => { navigate("/Calendar"); }}>홈</button>
                        <button type="button" onClick={() => { sendContectContents(); }}>문의하기</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Contect;